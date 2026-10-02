using Microsoft.EntityFrameworkCore;
using PhotoSession912.Domain.Entities;

namespace PhotoSession912.Infrastructure.Data;

public class PhotoSessionDBContext : DbContext
{
    public PhotoSessionDBContext(DbContextOptions<PhotoSessionDBContext> options) : base(options) { }

    public DbSet<LensEquipment> LensEquipments { get; set; }
    public DbSet<Session> Sessions { get; set; }

}