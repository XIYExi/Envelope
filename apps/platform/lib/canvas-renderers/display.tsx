/**
 * V5 Canvas Fidelity — 展示组件真实渲染
 */

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import type { PreviewRenderFn } from "./types";
import { pstr, pbool, pnum } from "./types";

export const renderAvatar: PreviewRenderFn = (props) => {
  const fallback = pstr(props, "fallback", "U");
  const size = pstr(props, "size", "default");
  const sizeClass = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-10 w-10";
  return (
    <Avatar className={sizeClass} data-design-mode="true">
      <AvatarFallback className="text-xs">{fallback}</AvatarFallback>
    </Avatar>
  );
};

export const renderBadge: PreviewRenderFn = (props) => {
  const text = pstr(props, "text", pstr(props, "label", "Badge"));
  return (
    <Badge
      variant={pstr(props, "variant", "default") as any}
      data-design-mode="true"
      data-live-edit-prop="text"
    >
      {text}
    </Badge>
  );
};

export const renderAlert: PreviewRenderFn = (props, children) => {
  const showTitle = props.showTitle !== false;
  const showDescription = props.showDescription !== false;
  const titleText = pstr(props, "titleText", "Alert");
  const descriptionText = pstr(props, "descriptionText", "Alert description...");
  return (
    <Alert
      variant={pstr(props, "variant", "default") as any}
      data-design-mode="true"
    >
      {children ?? (
        <>
          {showTitle && (
            <AlertTitle data-live-edit-prop="titleText" className="text-[10px] font-semibold">
              {titleText}
            </AlertTitle>
          )}
          {showDescription && (
            <AlertDescription data-live-edit-prop="descriptionText" className="text-[10px]">
              {descriptionText}
            </AlertDescription>
          )}
        </>
      )}
    </Alert>
  );
};

export const renderProgress: PreviewRenderFn = (props) => {
  return (
    <Progress
      value={pnum(props, "value", 60)}
      className="h-2"
      data-design-mode="true"
    />
  );
};

export const renderSkeleton: PreviewRenderFn = (props) => {
  const rows = pnum(props, "rows", 1);
  return (
    <div className="space-y-2" data-design-mode="true">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
};

export const renderText: PreviewRenderFn = (props) => {
  const text = pstr(props, "text", "Text");
  const className = pstr(props, "className", "");
  return (
    <span
      className={`text-sm ${className}`}
      data-design-mode="true"
      data-live-edit-prop="text"
    >
      {text}
    </span>
  );
};

export const renderBreadcrumb: PreviewRenderFn = (props) => {
  const items = (props.items as string[]) ?? ["Home", "Page"];
  return (
    <Breadcrumb data-design-mode="true">
      <BreadcrumbList>
        {items.map((item, i) => (
          <BreadcrumbItem key={i}>
            <BreadcrumbLink className="text-[10px]">{item}</BreadcrumbLink>
            {i < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const renderPagination: PreviewRenderFn = (props) => {
  const total = pnum(props, "total", 5);
  const current = pnum(props, "current", 1);
  return (
    <Pagination data-design-mode="true">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="h-7 text-[10px]" />
        </PaginationItem>
        {Array.from({ length: Math.min(total, 5) }).map((_, i) => {
          const page = i + 1;
          const isCurrent = page === current;
          return (
            <PaginationItem key={page}>
              <span
                className={`inline-flex h-7 items-center justify-center rounded px-2 text-[10px] ${
                  isCurrent ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {page}
              </span>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext className="h-7 text-[10px]" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
