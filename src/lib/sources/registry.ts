import { SourceAdapter, SupportedMetric } from "../types/source";

class SourceRegistry {
  private adapters: Map<string, SourceAdapter> = new Map();

  register(adapter: SourceAdapter) {
    this.adapters.set(adapter.id, adapter);
  }

  getAdapter(id: string): SourceAdapter | undefined {
    return this.adapters.get(id);
  }

  getAllAdapters(): SourceAdapter[] {
    return Array.from(this.adapters.values());
  }

  getAdaptersForMetric(metric: SupportedMetric): SourceAdapter[] {
    return this.getAllAdapters().filter((adapter) =>
      adapter.capabilities.some((cap) => cap.metric === metric)
    );
  }
}

import { webSearchAdapter } from "./web-search";
import { youtubeAdapter } from "./youtube";
import { trendsImportAdapter } from "./trends-import";

export const sourceRegistry = new SourceRegistry();

// Initialize the registry with available adapters
sourceRegistry.register(webSearchAdapter);
sourceRegistry.register(youtubeAdapter);
sourceRegistry.register(trendsImportAdapter);
