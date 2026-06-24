"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProjectFlowsStore } from "@/stores/project-flows";
import { useProjectModelsStore } from "@/stores/project-models";
import type { ProjectFlow } from "@/lib/supabase/types";
import { FlowEditor, jsonToYamlFile, yamlToJson, type FlowDefinition, type DataModelSchema } from "@envelope/flow";

function toFlowDefinition(flow: ProjectFlow): FlowDefinition | null {
  const text = (flow.yaml_content ?? "").trim();
  if (!text) return null;
  const parsed = yamlToJson(text);
  if (!parsed.success || !parsed.data || typeof parsed.data === "string") return null;
  return parsed.data;
}

export function ProjectFlowEditor() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const { flows, save } = useProjectFlowsStore();

  // 适配器模式：将 project-models store 中的表定义适配为 DataModelSchema
  const projectModelsTables = useProjectModelsStore((s) => s.tables);
  const dataModels: DataModelSchema | undefined = useMemo(() => {
    if (!projectModelsTables || projectModelsTables.length === 0) return undefined;
    return {
      tables: projectModelsTables.map((t: { name: string; columns: Array<{ name: string; type: string }> }) => ({
        name: t.name,
        columns: (t.columns ?? []).map((c: { name: string; type: string }) => ({
          name: c.name,
          type: c.type,
        })),
      })),
    };
  }, [projectModelsTables]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAppliedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    if (flows.length === 0) {
      setSelectedId(null);
      lastAppliedIdRef.current = null;
      return;
    }
    if (!selectedId || !flows.some((f) => f.id === selectedId)) {
      setSelectedId(flows[0]!.id);
      lastAppliedIdRef.current = null;
    }
  }, [projectId, flows, selectedId]);

  const selectedFlow = useMemo(
    () => (selectedId ? flows.find((f) => f.id === selectedId) ?? null : null),
    [flows, selectedId],
  );

  const initialFlow = useMemo(() => {
    if (!selectedFlow) return undefined;
    if (lastAppliedIdRef.current === selectedFlow.id) return undefined;
    const def = toFlowDefinition(selectedFlow);
    if (!def) return undefined;
    lastAppliedIdRef.current = selectedFlow.id;
    return def;
  }, [selectedFlow]);

  const upsertFlow = (patch: Partial<ProjectFlow> & { id: string }) => {
    useProjectFlowsStore.setState((s) => ({
      ...s,
      flows: s.flows.map((f) => (f.id === patch.id ? { ...f, ...patch } : f)),
    }));
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      void save();
    }, 30_000);
  };

  const createNewFlow = () => {
    const id = crypto.randomUUID();
    const row: ProjectFlow = {
      id,
      project_id: projectId ?? "",
      name: `flow-${id.slice(0, 8)}`,
      description: "",
      flow_type: "action",
      yaml_content: "",
      trigger_event: null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    useProjectFlowsStore.setState((s) => ({ ...s, flows: [...s.flows, row] }));
    setSelectedId(id);
    lastAppliedIdRef.current = null;
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      void save();
    }, 0);
  };

  if (!projectId) return <div className="p-4 text-sm text-muted-foreground">Select a project first.</div>;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b bg-background px-3 py-2">
        <select
          value={selectedId ?? ""}
          onChange={(e) => {
            if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
            autosaveTimerRef.current = null;
            void save().finally(() => {
              lastAppliedIdRef.current = null;
              setSelectedId(e.target.value);
            });
          }}
          className="h-8 rounded border bg-background px-2 text-xs"
        >
          <option value="" disabled>
            Select flow
          </option>
          {flows.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <Button size="sm" variant="outline" className="h-8 text-xs" onClick={createNewFlow}>
          New
        </Button>
        <div className="flex-1" />
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          disabled={!selectedFlow}
          onClick={() => void save()}
        >
          Save
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <FlowEditor
          initialFlow={initialFlow}
          dataModels={dataModels}
          onChange={(def) => {
            if (!selectedFlow) return;
            upsertFlow({
              id: selectedFlow.id,
              name: def.thing,
              description: def.description ?? "",
              yaml_content: jsonToYamlFile(def),
            });
          }}
        />
      </div>
    </div>
  );
}

