package kr.terp.cuttingPlan;

public class Stock {
    public float Size;
    public float Cost;
    public float MinimumReject;
    public int MaxPieces;
    public Boolean StockLimited = false;

    public Stock()
    {

    }

    public Stock(float cost, float size)
    {
        this.Cost = cost;
        this.Size = size;
    }
}
