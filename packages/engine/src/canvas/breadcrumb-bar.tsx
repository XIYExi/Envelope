/**
 * 面包屑导航栏（子编辑模式）
 *
 * 显示当前编辑路径，点击可逐级退出回到对应层级。
 *
 * @author xiye
 * @date 2026-06-25
 */

"use client";

import React from "react";

export function BreadcrumbBar({ editScope, onNavigate }: {
  editScope: { rootId: string; path: { id: string; type: string }[] };
  onNavigate: (index: number) => void;
}) {
  const crumbs = editScope.path;
  return (
    <div className="flex items-center gap-1 border-b bg-muted/30 px-3 py-1 text-[10px]">
      <span className="text-muted-foreground">Edit:</span>
      <button className="rounded px-1.5 py-0.5 font-medium text-blue-600 hover:bg-blue-50" onClick={() => onNavigate(-1)}>Root</button>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.id}>
          <span className="text-muted-foreground">/</span>
          <button
            className="rounded px-1.5 py-0.5 text-blue-600 hover:bg-blue-50"
            onClick={() => onNavigate(idx)}
          >
            {crumb.type}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
