using AuctionSystem.Data;
using AuctionSystem.Data_Transfer_Object;
using AuctionSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace AuctionSystem.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;

        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TransactionDto>> GetAllAsync()
        {
            return await _context.Transactions
                .Select(t => new TransactionDto
                {
                    TransactionId = t.TransactionId,
                    AuctionId = t.AuctionId,
                    BuyerId = t.BuyerId,
                    Amount = t.Amount,
                    TransactionDate = t.TransactionDate
                }).ToListAsync();
        }

        public async Task<TransactionDto> GetByIdAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null) return null!;

            return new TransactionDto
            {
                TransactionId = transaction.TransactionId,
                AuctionId = transaction.AuctionId,
                BuyerId = transaction.BuyerId,
                Amount = transaction.Amount,
                TransactionDate = transaction.TransactionDate
            };
        }

        public async Task<TransactionDto> CreateAsync(CreateTransactionDto dto)
        {
            var transaction = new Transaction
            {
                AuctionId = dto.AuctionId,
                BuyerId = dto.BuyerId,
                Amount = dto.Amount,
                TransactionDate = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return new TransactionDto
            {
                TransactionId = transaction.TransactionId,
                AuctionId = transaction.AuctionId,
                BuyerId = transaction.BuyerId,
                Amount = transaction.Amount,
                TransactionDate = transaction.TransactionDate
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null) return false;

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
