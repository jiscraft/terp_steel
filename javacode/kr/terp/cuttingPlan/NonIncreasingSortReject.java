package kr.terp.cuttingPlan;

import java.util.Comparator;

public class NonIncreasingSortReject implements Comparator<Bin>
{
	@Override
	public int compare(Bin x, Bin y)
	{
        int num;
        if (x.Reject <= y.Reject)
            num = (x.Reject >= y.Reject ? 0 : -1);
        else
            num = 1;

        return num;
	}
}