using AuctionSystem.Data;
using AuctionSystem.Data_Transfer_Object;
using AuctionSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace AuctionSystem.Services
{
    public class BidService : IBidService
    {
        private readonly ApplicationDbContext _context;

        public BidService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BidDto>> GetAllAsync()
        {
            return await _context.Bids
                .Select(b => new BidDto
                {
                    BidId = b.BidId,
                    BidAmount = b.BidAmount,
                    BidTime = b.BidTime,
                    AuctionId = b.AuctionId,
                    UserId = b.UserId
                }).ToListAsync();
        }

        public async Task<BidDto?> GetByIdAsync(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null) return null;

            return new BidDto
            {
                BidId = bid.BidId,
                BidAmount = bid.BidAmount,
                BidTime = bid.BidTime,
                AuctionId = bid.AuctionId,
                UserId = bid.UserId
            };
        }

        public async Task<BidDto> CreateAsync(CreateBidDto dto)
        {
            var bid = new Bid
            {
                BidAmount = dto.BidAmount,
                BidTime = DateTime.UtcNow,
                AuctionId = dto.AuctionId,
                UserId = dto.UserId
            };

            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            return new BidDto
            {
                BidId = bid.BidId,
                BidAmount = bid.BidAmount,
                BidTime = bid.BidTime,
                AuctionId = bid.AuctionId,
                UserId = bid.UserId
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null) return false;

            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<BidDto> PlaceBidAsync(CreateBidDto dto)
        {
            var auction = await _context.Auctions.FindAsync(dto.AuctionId);
            if (auction == null) throw new Exception("Auction not found");

            if (dto.BidAmount <= auction.CurrentBid)
                throw new Exception("Bid must be higher than the current bid");

            var bid = new Bid
            {
                BidAmount = dto.BidAmount,
                BidTime = DateTime.UtcNow,
                AuctionId = dto.AuctionId,
                UserId = dto.UserId
            };

            //  Update current bid
            auction.CurrentBid = dto.BidAmount;

            _context.Bids.Add(bid);
            await _context.SaveChangesAsync();

            return new BidDto
            {
                BidId = bid.BidId,
                BidAmount = bid.BidAmount,
                BidTime = bid.BidTime,
                AuctionId = bid.AuctionId,
                UserId = bid.UserId
            };
        }


    }
}
