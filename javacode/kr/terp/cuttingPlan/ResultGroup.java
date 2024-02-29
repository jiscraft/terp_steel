package kr.terp.cuttingPlan;
import java.util.ArrayList;
public class ResultGroup {
    public String Solution;
    public double AbsoluteBestSize;
    public double BestCost;
    public double SumOfStocksUsed;
    public double SumOfItems;
    public double Reject;
    public double CostOfThisSolution;
    public ArrayList<ResultItem> ListResultItem;

    public ResultGroup()
    {
        this.Solution = "";
        this.AbsoluteBestSize = 0;
        this.BestCost = 0;
        this.SumOfStocksUsed = 0;
        this.SumOfItems = 0;
        this.Reject = 0;
        this.CostOfThisSolution = 0;
        this.ListResultItem = new ArrayList<ResultItem>();
    }
}
