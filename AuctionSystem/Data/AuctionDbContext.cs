using AuctionSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User → Auction
            modelBuilder.Entity<Auction>()
                .HasOne(a => a.CreatedBy)
                .WithMany(u => u.CreatedAuctions)
                .HasForeignKey(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Cascade);

            // Category → Auction
            modelBuilder.Entity<Auction>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Auctions)
                .HasForeignKey(a => a.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            // Auction → Bid
            modelBuilder.Entity<Bid>()
                .HasOne(b => b.Auction)
                .WithMany(a => a.Bids)
                .HasForeignKey(b => b.AuctionId)
                .OnDelete(DeleteBehavior.Cascade);

            // User → Bid 
            modelBuilder.Entity<Bid>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bids)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // User → Notification 
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Transaction → Auction 
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Auction)
                .WithMany()
                .HasForeignKey(t => t.AuctionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Transaction → Buyer 
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Buyer)
                .WithMany()
                .HasForeignKey(t => t.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
