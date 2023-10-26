export function formatReadableDate(dateString: string, locales?: string | string[], options?: Intl.DateTimeFormatOptions): string {
    const defaultOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const combinedOptions = { ...defaultOptions, ...options };
  
    return new Date(dateString).toLocaleDateString(locales, combinedOptions);
}

