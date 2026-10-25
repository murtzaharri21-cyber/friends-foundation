type DatabaseFailure = {
  message: string;
  status: 500 | 503;
};

export function getDatabaseFailure(error: unknown, fallback: string): DatabaseFailure {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? error.code
      : "";

  if (["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "ENOTFOUND", "EHOSTUNREACH"].includes(code)) {
    return {
      message: "The donation database is unavailable right now. Please try again later or contact us.",
      status: 503,
    };
  }

  if (["42P01", "42703", "3F000", "42704"].includes(code)) {
    return {
      message: "The donation database needs its latest migration before it can accept this request.",
      status: 503,
    };
  }

  if (["28P01", "28000", "42501"].includes(code)) {
    return {
      message: "The donation database is not configured to accept this request. Please contact the site administrator.",
      status: 503,
    };
  }

  return { message: fallback, status: 500 };
}
