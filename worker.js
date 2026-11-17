#//update
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json(
        { status: "ready", service: "Prediction Market Feed" },
        { headers }
      );
    }

    if (url.pathname === "/test-trades") {
      try {
        const response = await fetch(
          "https://prediction.com/api/v2/events?limit=1",
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
        }, { headers });
      } catch (error) {
        return Response.json(
          { error: error.message },
          { status: 500, headers }
        );
      }
    }

    return Response.json({
      status: "awaiting_live_data",
      trades: [],
      filters: {
        minTrade: 500,
        maxTrade: 1000000,
        minPrice: 0.10,
        maxPrice: 0.90,
        platform: "all",
        side: "all"
      },
      message: "Live trade connection not yet verified."
    }, { headers });
  }
};
// update
