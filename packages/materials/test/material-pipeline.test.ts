/**
 * 物料管线单元测试
 *
 * 覆盖 Transducer 管道、NestingValidator、buildAvailableActions
 * 及新增 Zod schema 字段的向后兼容性。
 *
 * @author xiye
 * @date 2026-06-30
 */

import { describe, it, expect } from 'vitest';
import { createRegistry } from '../src/registry';
import { NestingValidator } from '../src/nesting-validator';
import { buildAvailableActions } from '../src/available-actions';
import { componentDefaults, BUILTIN_TRANSDUCERS } from '../src/builtin-transducers';
import { materialDefinitionSchema } from '../src/types/material';
import type { MaterialDefinition, MetadataTransducer } from '../src/types/material';

/** 测试用物料查找函数 */
function createLookup(...defs: MaterialDefinition[]): (name: string) => MaterialDefinition | undefined {
  const map = new Map(defs.map((d) => [d.name, d]));
  return (name: string) => map.get(name);
}

/** 基础物料定义（不含新字段） */
const baseDef: MaterialDefinition = {
  name: 'TestButton',
  displayName: 'Test Button',
  category: 'form',
  description: 'A test button',
};

describe('V4-F6: 向后兼容 — 现有物料零改动', () => {
  it('不含新字段的物料可正常解析', () => {
    const result = materialDefinitionSchema.safeParse(baseDef);
    expect(result.success).toBe(true);
  });

  it('含新字段的物料可正常解析', () => {
    const full: MaterialDefinition = {
      ...baseDef,
      nestingRules: { childWhitelist: ['Button'] },
      disableBehaviors: ['delete'],
      snippets: [{ title: 'Primary', props: { variant: 'default' } }],
    };
    const result = materialDefinitionSchema.safeParse(full);
    expect(result.success).toBe(true);
  });
});

describe('V4-F1: Transducer 管道', () => {
  it('registerTransducer 后 register 时自动执行转换', () => {
    const registry = createRegistry();
    const spy: MetadataTransducer = (meta) => ({ ...meta, description: 'transformed' });
    spy.level = 50;
    registry.registerTransducer(spy);
    registry.register(baseDef);
    const stored = registry.get('TestButton');
    expect(stored?.description).toBe('transformed');
  });

  it('多 transducer 按 level 排序执行', () => {
    const registry = createRegistry();
    const order: string[] = [];
    const a: MetadataTransducer = (meta) => { order.push('a'); return meta; };
    const b: MetadataTransducer = (meta) => { order.push('b'); return meta; };
    a.level = 100; b.level = 50;
    registry.registerTransducer(a);
    registry.registerTransducer(b);
    registry.register(baseDef);
    expect(order).toEqual(['b', 'a']);
  });

  it('不注册 transducer 时 register 正常（空管道）', () => {
    const registry = createRegistry();
    registry.register(baseDef);
    const stored = registry.get('TestButton');
    expect(stored?.name).toBe('TestButton');
  });

  it('componentDefaults 自动推断 Group 嵌套规则', () => {
    const groupDef: MaterialDefinition = {
      name: 'TabsGroup',
      displayName: 'Tabs Group',
      category: 'navigation',
    };
    const transformed = componentDefaults(groupDef);
    expect(transformed.nestingRules?.childWhitelist).toContain('Tabs');
  });

  it('componentDefaults 自动推断 Item 嵌套规则', () => {
    const itemDef: MaterialDefinition = {
      name: 'MenuItem',
      displayName: 'Menu Item',
      category: 'navigation',
    };
    const transformed = componentDefaults(itemDef);
    expect(transformed.nestingRules?.parentWhitelist).toContain('Menu');
  });

  it('componentDefaults 不覆盖显式声明的 nestingRules', () => {
    const def: MaterialDefinition = {
      ...baseDef,
      nestingRules: { parentWhitelist: ['Custom'] },
    };
    const transformed = componentDefaults(def);
    expect(transformed.nestingRules?.parentWhitelist).toEqual(['Custom']);
  });

  it('BUILTIN_TRANSDUCERS 包含 componentDefaults', () => {
    expect(BUILTIN_TRANSDUCERS).toHaveLength(1);
    expect(BUILTIN_TRANSDUCERS[0].id).toBe('component-defaults');
  });
});

describe('V4-F2+V4-F4: NestingValidator 嵌套校验', () => {
  it('checkChildAllowed — 白名单匹配通过', () => {
    const parent: MaterialDefinition = {
      name: 'Card',
      displayName: 'Card',
      category: 'layout',
      nestingRules: { childWhitelist: ['CardHeader', 'CardContent'] },
    };
    const lookup = createLookup(parent);
    expect(NestingValidator.checkChildAllowed('Card', 'CardHeader', lookup)).toBe(true);
  });

  it('checkChildAllowed — 白名单不匹配拒绝', () => {
    const parent: MaterialDefinition = {
      name: 'Card',
      displayName: 'Card',
      category: 'layout',
      nestingRules: { childWhitelist: ['CardHeader'] },
    };
    const lookup = createLookup(parent);
    expect(NestingValidator.checkChildAllowed('Card', 'Button', lookup)).toBe(false);
  });

  it('checkChildAllowed — 未设置白名单时默认允许', () => {
    const parent: MaterialDefinition = { name: 'Flex', displayName: 'Flex', category: 'layout' };
    const lookup = createLookup(parent);
    expect(NestingValidator.checkChildAllowed('Flex', 'Button', lookup)).toBe(true);
  });

  it('checkParentAllowed — 白名单匹配通过', () => {
    const child: MaterialDefinition = {
      name: 'CardHeader',
      displayName: 'Card Header',
      category: 'layout',
      nestingRules: { parentWhitelist: ['Card'] },
    };
    const lookup = createLookup(child);
    expect(NestingValidator.checkParentAllowed('CardHeader', 'Card', lookup)).toBe(true);
  });

  it('checkParentAllowed — 白名单不匹配拒绝', () => {
    const child: MaterialDefinition = {
      name: 'CardHeader',
      displayName: 'Card Header',
      category: 'layout',
      nestingRules: { parentWhitelist: ['Card'] },
    };
    const lookup = createLookup(child);
    expect(NestingValidator.checkParentAllowed('CardHeader', 'Flex', lookup)).toBe(false);
  });

  it('checkNesting — 综合校验双向通过', () => {
    const parent: MaterialDefinition = {
      name: 'Card', displayName: 'Card', category: 'layout',
      nestingRules: { childWhitelist: ['CardHeader'] },
    };
    const child: MaterialDefinition = {
      name: 'CardHeader', displayName: 'Card Header', category: 'layout',
      nestingRules: { parentWhitelist: ['Card'] },
    };
    const lookup = createLookup(parent, child);
    expect(NestingValidator.checkNesting('Card', 'CardHeader', lookup)).toBe(true);
    expect(NestingValidator.checkNesting('Card', 'Button', lookup)).toBe(false);
  });
});

describe('V4-F3+V4-F5: buildAvailableActions', () => {
  it('未设置 disableBehaviors 时返回全部操作', () => {
    const actions = buildAvailableActions(baseDef);
    expect(actions.length).toBeGreaterThan(0);
    expect(actions.find((a) => a.name === 'copy')).toBeDefined();
    expect(actions.find((a) => a.name === 'delete')).toBeDefined();
  });

  it('disableBehaviors 排除指定操作', () => {
    const def: MaterialDefinition = { ...baseDef, disableBehaviors: ['delete', 'copy'] };
    const actions = buildAvailableActions(def);
    expect(actions.find((a) => a.name === 'delete')).toBeUndefined();
    expect(actions.find((a) => a.name === 'copy')).toBeUndefined();
    expect(actions.find((a) => a.name === 'move')).toBeDefined();
  });

  it('* 通配符禁用所有非 always 操作', () => {
    const def: MaterialDefinition = { ...baseDef, disableBehaviors: ['*' as any] };
    const actions = buildAvailableActions(def);
    expect(actions.find((a) => a.name === 'lock')).toBeUndefined();
    expect(actions.find((a) => a.name === 'copy')).toBeDefined(); // always
    expect(actions.find((a) => a.name === 'delete')).toBeDefined(); // always
  });

  it('有条件的操作根据 component 状态过滤', () => {
    const def: MaterialDefinition = { ...baseDef };
    // 未锁定组件不显示 unlock
    const unlockedActions = buildAvailableActions(def, { locked: false });
    expect(unlockedActions.find((a) => a.name === 'unlock')).toBeUndefined();
    expect(unlockedActions.find((a) => a.name === 'lock')).toBeDefined();

    // 锁定组件显示 unlock 不显示 lock
    const lockedActions = buildAvailableActions(def, { locked: true });
    expect(lockedActions.find((a) => a.name === 'unlock')).toBeDefined();
    expect(lockedActions.find((a) => a.name === 'lock')).toBeUndefined();
  });
});
