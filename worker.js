
if (url.pathname === "/test-trades") {
  try {
    const response = await fetch(
      "https://prediction.com/api/v2/trades?min_total=500&limit=20",
      {
        headers: {
          "X-API-Key": env.PREDICTION_API_KEY
        }
      }
    );

    const data = await response.json();

    return Response.json({
      httpStatus: response.status,
      trades: data.trades ?? [],
      pagination: data.pagination ?? null,
      error: data.error ?? null
    });
  } catch (error) {
    return Response.json({
      error: error.message
    }, { status: 500 });
  }
}
