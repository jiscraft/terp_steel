package kr.terp.cuttingPlan;

import java.util.Comparator;

public class NonDecreasingSortOnBranchAndBoundSize implements Comparator<BranchAndBound.BranchBound>
{
	@Override
	public int compare(BranchAndBound.BranchBound x, BranchAndBound.BranchBound y)
	{
		int num;
		if (x.Size <= y.Size)
			num = (x.Size >= y.Size ? 0 : -1);
		else
			num = 1;

		return num;
	}
}