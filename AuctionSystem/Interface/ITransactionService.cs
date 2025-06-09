using AuctionSystem.Data_Transfer_Object;

namespace AuctionSystem.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllAsync();
        Task<TransactionDto> GetByIdAsync(int id);
        Task<TransactionDto> CreateAsync(CreateTransactionDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
