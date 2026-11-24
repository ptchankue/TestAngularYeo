export interface Release {
  version: number;
  date: string;
  highlights: string[];
}

export const RELEASES: Release[] = [
  {
    version: 17,
    date: 'November 2023',
    highlights: ['Built-in control flow (@if, @for, @switch)', '@defer blocks', 'Vite + esbuild builder by default', 'angular.dev'],
  },
  {
    version: 18,
    date: 'May 2024',
    highlights: ['Experimental zoneless change detection', 'Fallback content for <ng-content>', 'Unified form control state events'],
  },
  {
    version: 19,
    date: 'November 2024',
    highlights: ['Standalone by default', 'linkedSignal() and resource() (experimental)', '@let template variables stable', 'Incremental hydration (preview)'],
  },
  {
    version: 20,
    date: 'May 2025',
    highlights: ['effect(), linkedSignal() and toSignal() stable', 'httpResource()', 'Zoneless in developer preview', 'Template literals in templates'],
  },
  {
    version: 21,
    date: 'November 2025',
    highlights: ['Zoneless by default for new apps', 'Signal Forms (experimental)', 'Vitest as the default test runner', 'Angular Aria (developer preview)'],
  },
];

/** Stands in for an HTTP call so the resource() demo works offline. */
export function fetchRelease(version: number, abortSignal: AbortSignal): Promise<Release> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const release = RELEASES.find((r) => r.version === version);
      if (release) {
        resolve(release);
      } else {
        reject(new Error(`Unknown version ${version}`));
      }
    }, 600);
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(abortSignal.reason);
    });
  });
}
