
// -----------------------------------------------------------------------------
// CẢNH BÁO BẢO MẬT QUAN TRỌNG
// -----------------------------------------------------------------------------
// API Key của bạn đang được đặt trực tiếp trong mã nguồn frontend.
// Điều này cực kỳ NGUY HIỂM cho một ứng dụng thực tế (production)
// vì bất kỳ ai cũng có thể xem mã nguồn và lấy cắp key của bạn.
//
// Cách làm này chỉ DÀNH CHO MỤC ĐÍCH THỬ NGHIỆM trên máy tính cá nhân.
//
// Trong một dự án thực tế, bạn PHẢI:
// 1. Sử dụng biến môi trường (environment variables) để lưu trữ key.
// 2. Tốt nhất là tạo một máy chủ backend để làm proxy, backend sẽ giữ key
//    an toàn và giao tiếp với Helius, sau đó frontend chỉ nói chuyện
//    với backend của bạn.
// -----------------------------------------------------------------------------

const API_KEY = '4cc851a3-f12b-4e18-a1d0-f6dceabe3d55';

// NOTE: Switched to devnet to match the wallet adapter configuration.
export const HELIUS_WEBSOCKET_URL = `wss://devnet.helius-rpc.com/?api-key=${API_KEY}`;
export const HELIUS_RPC_URL = `https://devnet.helius-rpc.com/?api-key=${API_KEY}`;
