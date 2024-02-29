package kr.terp.cuttingPlan;

import java.util.Comparator;

public class NonDecreasingSortOnItemSize  implements Comparator<Item>
{
	@Override
	public int compare(Item x, Item y)
	{
		int num;
		if (x.Size <= y.Size)
			num = (x.Size >= y.Size ? 0 : -1);
		else
			num = 1;

		return num;
	}
}