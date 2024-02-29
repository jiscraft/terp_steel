package kr.terp.cuttingPlan;

import java.util.Comparator;

public class NonIncreasingSortOnStockSize implements Comparator<Stock>
{
	@Override
	public int compare(Stock x, Stock y) 
	{
		int num;
		if (x.Size >= y.Size)
			num = (x.Size <= y.Size ? 0 : -1);
		else
			num = 1;

		return num;
	}
}
