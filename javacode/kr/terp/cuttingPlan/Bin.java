package kr.terp.cuttingPlan;
import java.util.ArrayList;
public class Bin {
    public Boolean TheBinIsLINQable;
    public float Stock;
    public float Cost;
    public float Employ;
    public float Reject;
    public float MinReject;
    public ArrayList<Item> ItemsAssigned;

    public Bin(float size, float cost, float minimumReject)
    {
        this.TheBinIsLINQable = true;
        this.Stock = size;
        this.Cost = cost;
        this.Employ = 0f;
        this.MinReject = minimumReject;
        this.Reject = size - minimumReject;
        this.ItemsAssigned = new ArrayList<Item>();
    }
}
