namespace PhotoSession912.Domain.Entities;

public class LensEquipment
{
    public int Id { get; set; }
    public string Modelo { get; set; } = string.Empty;
    public string DistanciaFocal { get; set; } = string.Empty;
    public string Tipo { get; set; } = string.Empty;
}