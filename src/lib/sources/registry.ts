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

export const sourceRegistry = new SourceRegistry();

// Initialize empty for now. Adapters will be registered in Sprint 3.
