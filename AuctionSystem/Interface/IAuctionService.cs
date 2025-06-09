using AuctionSystem.Data_Transfer_Object;

namespace AuctionSystem.Services
{
    public interface IAuctionService
    {
        Task<IEnumerable<AuctionDto>> GetAllAsync();
        Task<AuctionDto?> GetByIdAsync(int id);
        Task<AuctionDto> CreateAsync(CreateAuctionDto dto);
        Task<bool> DeleteAsync(int id);
        Task<AuctionDto?> UpdateAsync(int id, CreateAuctionDto dto);
    }
}
