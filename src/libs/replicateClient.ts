import Replicate from "replicate";

let replicateClient: Replicate;

export const getReplicateClient = () => {
  if (!replicateClient) {
    // 检查是否启用了测试模式
    const isTestMode = process.env.NODE_ENV !== 'production' || process.env.TEST_MODE === 'true';
    
    if (isTestMode) {
      console.log("Running in test mode, using mock Replicate client");
      // 创建一个模拟的 Replicate 客户端
      replicateClient = {
        predictions: {
          create: async (params: any) => {
            console.log("Mock Replicate API call:", params);
            return {
              id: "mock-prediction-id",
              status: "succeeded",
              output: ["https://picsum.photos/seed/123/512/512"]
            };
          }
        }
      } as any;
    } else {
      // 使用环境变量中的 API 令牌，如果没有则使用默认值（仅用于测试）
      const apiToken = process.env.REPLICATE_API_TOKEN || "r8_1234567890abcdefghijklmnopqrstuvwxyz";
      
    replicateClient = new Replicate({
        auth: apiToken,
    });
      
      console.log("Replicate client initialized with API token:", apiToken ? "已设置" : "未设置");
    }
  }
  return replicateClient;
}
