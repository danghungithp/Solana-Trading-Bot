
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-sky-400 border-b border-slate-700 pb-2">{title}</h3>
        <div className="text-slate-300 space-y-3 leading-relaxed">
            {children}
        </div>
    </div>
);

const DataSources: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto text-slate-200 space-y-8">
            <h2 className="text-3xl font-bold text-center">Nguồn Dữ Liệu & MEV</h2>
            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-200 px-4 py-3 rounded-lg" role="alert">
                <p className="font-bold">Lưu ý Quan Trọng</p>
                <p className="text-sm">Giao diện dashboard này đang hoạt động ở chế độ **MÔ PHỎNG**. Tất cả dữ liệu P&L, vị thế, và logs (bao gồm cả các cảnh báo MEV) đều được tạo ngẫu nhiên để minh họa. Hệ thống chưa được kết nối với bất kỳ nguồn dữ liệu on-chain thực tế nào.</p>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-slate-700 pb-2 mb-4">Nguồn Dữ Liệu Cho Bot Giao Dịch Thực Tế</h2>
                
                <InfoCard title="Luồng Giao Dịch Độ Trễ Thấp (gRPC)">
                    <p>Đây là nguồn dữ liệu quan trọng nhất để phát hiện các cơ hội MEV (Maximal Extractable Value) bằng cách "nhìn thấy" các giao dịch trước khi chúng được xác nhận trên blockchain.</p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><strong>Triton One:</strong> Một trong những nhà cung cấp hàng đầu, cung cấp các stream giao dịch (gRPC) có độ trễ cực thấp, cho phép bot phát hiện giao dịch ngay khi chúng được gửi đến leader node.</li>
                        <li><strong>Jito Labs:</strong> Nổi tiếng với Block Engine cho phép các "searcher" gửi các gói giao dịch (bundles) một cách riêng tư để thực hiện chiến lược MEV mà không bị front-run bởi các bot khác.</li>
                    </ul>
                </InfoCard>

                <InfoCard title="Nhà Cung Cấp RPC Nâng Cao">
                    <p>
                        <strong>Helius, QuickNode:</strong> Các nhà cung cấp RPC node này cũng cung cấp các API và WebSocket nâng cao để theo dõi các giao dịch đang chờ xử lý (mempool), rất hữu ích cho việc phát hiện MEV.
                    </p>
                    <p>Họ cung cấp các endpoint mạnh mẽ, đáng tin cậy và thường đi kèm các tính năng bổ sung như phân tích giao dịch, giúp giảm tải công việc cho bot so với việc tự vận hành một node.</p>
                </InfoCard>

                 <InfoCard title="Tự Vận Hành Node (Self-Hosted)">
                    <p>Đây là giải pháp tối ưu nhất về độ trễ và khả năng kiểm soát nhưng cũng phức tạp và tốn kém nhất. Việc tự chạy một validator node của Solana cho phép bot truy cập trực tiếp vào mempool mà không qua bất kỳ bên trung gian nào, nhưng đòi hỏi phần cứng mạnh mẽ và kiến thức kỹ thuật sâu rộng.</p>
                </InfoCard>
            </div>
        </div>
    );
};

export default DataSources;
