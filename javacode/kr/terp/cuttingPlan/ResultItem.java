package kr.terp.cuttingPlan;

import java.util.ArrayList;

public class ResultItem
{
    public float Stock;
    public float Cost;
    public float Used;
    public float ReJect;
    public float MinimumReject;
    public ArrayList<Float> ListSplice;
    public ArrayList<String> ListPartName;

    public ResultItem()
    {
        this.Stock = 0;
        this.Cost = 0;
        this.Used = 0;
        this.ReJect = 0;
        this.MinimumReject = 0;
        this.ListSplice = new ArrayList<Float>();
        this.ListPartName = new ArrayList<String>();
    }
}