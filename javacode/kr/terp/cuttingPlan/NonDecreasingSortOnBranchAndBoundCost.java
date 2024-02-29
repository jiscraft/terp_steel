package kr.terp.cuttingPlan;

import java.util.Comparator;

public class NonDecreasingSortOnBranchAndBoundCost implements Comparator<BranchAndBound.BranchBound>
{
	@Override
	public int compare(BranchAndBound.BranchBound x, BranchAndBound.BranchBound y)
	{
		int num;
		if (x.Cost <= y.Cost)
			num = (x.Cost >= y.Cost ? 0 : -1);
		else
			num = 1;

		return num;
	}
}