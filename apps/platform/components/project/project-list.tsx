"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjects, useCreateProject, useDeleteProject, useDuplicateProject, useUpdateProject } from "@/lib/hooks/use-projects";
import { useProjectLocalSync } from "@/lib/hooks/use-project-local-sync";
import type { Project } from "@/lib/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProjectSyncCompareDialog } from "@/components/project/project-sync-compare-dialog";
import { Plus, Trash2, Copy, Pencil, FolderOpen, Upload, Download, LoaderCircle } from "lucide-react";

type ProjectListCardProps = {
  project: Project;
  editingId: string | null;
  editName: string;
  setEditName: (value: string) => void;
  setEditingId: (value: string | null) => void;
  onDelete: (id: string) => Promise<void>;
  onOpen: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string, name: string) => void;
  isUpdating: boolean;
  isDuplicating: boolean;
};

/**
 * 项目卡片。
 *
 * 单独拆分为子组件，便于每张卡片独立消费同步 hook，
 * 从而在列表中合法地展示 local 同步状态与一键同步入口。
 */
function ProjectListCard(props: ProjectListCardProps) {
  const {
    project,
    editingId,
    editName,
    setEditName,
    setEditingId,
    onDelete,
    onOpen,
    onRename,
    onDuplicate,
    isUpdating,
    isDuplicating,
  } = props;

  const sync = useProjectLocalSync(project.id, {
    successMessage: `项目「${project.name}」同步完成`,
  });
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const syncActionBusy = sync.isSyncing || sync.isResolvingBaseline;

  return (
    <Card className="group relative">
      {editingId === project.id ? (
        <CardHeader>
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onRename(project.id, editName);
                setEditingId(null);
              }
              if (e.key === "Escape") setEditingId(null);
            }}
            autoFocus
          />
        </CardHeader>
      ) : (
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description || "No description"}
              </CardDescription>
            </div>
            {sync.supported && (
              <Badge variant={sync.summary.badgeVariant} className="shrink-0">
                {sync.summary.badgeLabel}
              </Badge>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Updated {new Date(project.updated_at).toLocaleDateString()}
        </p>
        {sync.supported && (
          <>
            <p className="min-h-8 text-xs text-muted-foreground" title={sync.summary.detail ?? undefined}>
              {sync.summary.detail ?? "本地同步状态可用"}
            </p>
            <div className="space-y-2 rounded-md border border-dashed bg-muted/30 p-2">
              <div className="flex flex-wrap items-center gap-1">
                <Badge variant={sync.compareSummary.badgeVariant} className="text-[10px]">
                  {sync.compareSummary.badgeLabel}
                </Badge>
                {sync.compareSummary.conflictCount > 0 && (
                  <Badge variant="destructive" className="text-[10px]">
                    冲突 {sync.compareSummary.conflictCount}
                  </Badge>
                )}
                {sync.compareSummary.localOnlyCount > 0 && (
                  <Badge variant="default" className="text-[10px]">
                    本地 {sync.compareSummary.localOnlyCount}
                  </Badge>
                )}
                {sync.compareSummary.remoteOnlyCount > 0 && (
                  <Badge variant="secondary" className="text-[10px]">
                    远端 {sync.compareSummary.remoteOnlyCount}
                  </Badge>
                )}
              </div>
              <p className="min-h-10 text-[11px] leading-5 text-muted-foreground" title={sync.compareSummary.detail ?? undefined}>
                {sync.compareSummary.detail ?? "比较结果暂不可用"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[11px]"
                disabled={!sync.compareResult && sync.isComparing}
                onClick={() => setCompareDialogOpen(true)}
              >
                查看 Compare 详情
              </Button>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex-wrap gap-1">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 min-w-24"
          onClick={() => onOpen(project.id)}
        >
          <FolderOpen className="mr-1 h-3.5 w-3.5" />
          Open
        </Button>
        {sync.supported && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 text-[11px]"
              disabled={!sync.canPush || syncActionBusy}
              onClick={() => void sync.push()}
              title={sync.compareSummary.detail ?? "推送本地改动到远端"}
            >
              {sync.isSyncing ? (
                <LoaderCircle className="mr-1 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="mr-1 h-3.5 w-3.5" />
              )}
              Push
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 text-[11px]"
              disabled={!sync.canPull || syncActionBusy}
              onClick={() => void sync.pull()}
              title={sync.compareSummary.detail ?? "拉取远端改动到本地"}
            >
              {sync.isSyncing ? (
                <LoaderCircle className="mr-1 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="mr-1 h-3.5 w-3.5" />
              )}
              Pull
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isUpdating}
          onClick={() => {
            setEditingId(project.id);
            setEditName(project.name);
          }}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isDuplicating}
          onClick={() => onDuplicate(project.id, `${project.name} (Copy)`)}
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => void onDelete(project.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
      <ProjectSyncCompareDialog
        open={compareDialogOpen}
        onOpenChange={setCompareDialogOpen}
        projectName={project.name}
        compareResult={sync.compareResult}
        compareSummary={sync.compareSummary}
        disabled={!sync.supported}
        isSubmitting={syncActionBusy}
        onKeepLocal={sync.keepLocal}
        onKeepRemote={sync.keepRemote}
        onSetBaseline={sync.setBaseline}
      />
    </Card>
  );
}

export function ProjectList() {
  const router = useRouter();
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const updateProject = useUpdateProject();

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createProject.mutateAsync({ name: newName.trim(), description: newDesc.trim() });
    setNewName("");
    setNewDesc("");
    setShowCreate(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await deleteProject.mutateAsync(id);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-destructive">Failed to load projects</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your lowcode projects</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} disabled={createProject.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create New Project</CardTitle>
            <CardDescription>Start a new lowcode project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="My Awesome App"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-desc">Description (optional)</Label>
              <Input
                id="project-desc"
                placeholder="What is this project about?"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button onClick={handleCreate} disabled={!newName.trim() || createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
            <Button variant="ghost" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}

      <Separator />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects && projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectListCard
              key={project.id}
              project={project}
              editingId={editingId}
              editName={editName}
              setEditName={setEditName}
              setEditingId={setEditingId}
              onDelete={handleDelete}
              onOpen={(id) => router.push(`/inner?project=${id}`)}
              onRename={(id, name) => updateProject.mutate({ id, name })}
              onDuplicate={(id, name) => duplicateProject.mutate({ id, name })}
              isUpdating={updateProject.isPending}
              isDuplicating={duplicateProject.isPending}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold">No projects yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first project to get started
          </p>
        </div>
      )}
    </div>
  );
}
