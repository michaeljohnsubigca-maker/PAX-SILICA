export interface CitationEntry {
  id: string;
  url: string;
}

export interface RedirectHop {
  from: string;
  to: string;
  status: number;
}

export interface VerifyCitationOptions {
  maxHops?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  userAgent?: string;
}

export interface VerificationResult {
  ok: boolean;
  url: string;
  finalUrl: string;
  status: number | string;
  reason?: string;
  title: string;
  hops: RedirectHop[];
}

export function extractCitationEntries(fileContent: string): CitationEntry[];
export function isGenericPath(pathname: string): boolean;
export function isRedirectWrapperUrl(urlString: string): boolean;
export function detectBotChallenge(
  status: number,
  headers: Headers | Record<string, string | string[] | undefined>,
  html?: string,
): boolean;
export function verifyCitationUrl(
  initialUrl: string,
  options?: VerifyCitationOptions,
): Promise<VerificationResult>;
