package kr.terp.cuttingPlan;

public class Item {
    public String PartName;
    public float Size;
    public int Pieces;

    public Item()
    {

    }

    public Item(String partName, int pieces, float size)
    {
        this.PartName = partName;
        this.Pieces = pieces;
        this.Size = size;
    }
}
