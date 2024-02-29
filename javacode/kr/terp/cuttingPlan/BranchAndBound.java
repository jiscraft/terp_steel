package kr.terp.cuttingPlan;

import java.util.ArrayList;

public class BranchAndBound 
{
	private float MaxBranch;
	private float EvaluatedBranchCounter;
	private float TotalItemsSum;
	private float BoundValue;
	private int[] MaxStocksQuantity;
	private ArrayList<Stock> BranchListOfStocks;
	//private ArrayList<Item> BranchListOfItems;
	private ArrayList<BranchBound> BranchBoundList;
	
    public BranchAndBound(ArrayList<Stock> theStocks, ArrayList<Item> theItems, float theTotalItemsSum, float theBound)
	{
		this.TotalItemsSum = theTotalItemsSum;
		this.BoundValue = theBound;
		this.BranchListOfStocks = new ArrayList<Stock>();
		this.BranchListOfStocks = theStocks;
		//this.BranchListOfItems = new ArrayList<Item>();
		//this.BranchListOfItems = theItems;
		this.MaxStocksQuantity = new int[theStocks.size()];
		this.BranchBoundList = new ArrayList<BranchBound>();
	}
    
	private void AddItemToBranchBoundList(BranchBound myB, int[] myCoeff)
	{
		//int num = 0;
		for (int i = 0; i < this.BranchListOfStocks.size(); i++)
		{
			while (myCoeff[i] > 0)
			{
                Stock stock = this.BranchListOfStocks.get(i);
                myB.SetOfStocks.add(stock.Size);
                myB.SetOfStocksCost.add(stock.Cost);
                myB.SetOfStocksMinimumRejects.add(stock.MinimumReject);
				myCoeff[i] = myCoeff[i] - 1;
				//num++;
			}
		}
		this.BranchBoundList.add(myB);
	}

	public ArrayList<BranchBound> GetBranchAndBound()
	{
		this.GetMaxStocksQuantity();
		this.GetBranchBoundList();
		return this.BranchBoundList;
	}
	
	private void GetBranchBoundList()
	{
		float size;
		int i;
		BranchBound branchBound;
		int j;
		int k;
		int l;
		int m;
		int[] numArray;
		try
		{
			if ((int)this.MaxStocksQuantity.length == 1)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					BranchAndBound evaluatedBranchCounter = this;
					evaluatedBranchCounter.EvaluatedBranchCounter = evaluatedBranchCounter.EvaluatedBranchCounter + 1f;
					if (this.EvaluatedBranchCounter % 500f == 0f)
					{
                        //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
					}
					size = (float)i * this.BranchListOfStocks.get(0).Size;
					if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
					{
						branchBound = new BranchBound();
						branchBound.Size = size;
						branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost;

						numArray = new int[] { i };
						this.AddItemToBranchBoundList(branchBound, numArray);
					}
				}
			}
			if ((int)this.MaxStocksQuantity.length == 2)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					for (j = 0; j <= this.MaxStocksQuantity[1]; j++)
					{
						BranchAndBound branchAndBound = this;
						branchAndBound.EvaluatedBranchCounter = branchAndBound.EvaluatedBranchCounter + 1f;
						if (this.EvaluatedBranchCounter % 500f == 0f)
						{
                            //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
						}
						size = (float)i * this.BranchListOfStocks.get(0).Size + (float)j * this.BranchListOfStocks.get(1).Size;
						if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
						{
							branchBound = new BranchBound();
							branchBound.Size = size;
							branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost + (float)j * this.BranchListOfStocks.get(1).Cost;

							numArray = new int[] { i, j };
							this.AddItemToBranchBoundList(branchBound, numArray);
						}
					}
				}
			}
			if ((int)this.MaxStocksQuantity.length == 3)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					for (j = 0; j <= this.MaxStocksQuantity[1]; j++)
					{
						for (k = 0; k <= this.MaxStocksQuantity[2]; k++)
						{
							BranchAndBound evaluatedBranchCounter1 = this;
							evaluatedBranchCounter1.EvaluatedBranchCounter = evaluatedBranchCounter1.EvaluatedBranchCounter + 1f;
							if (this.EvaluatedBranchCounter % 500f == 0f)
							{
                                //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
							}
							size = (float)i * this.BranchListOfStocks.get(0).Size + (float)j * this.BranchListOfStocks.get(1).Size + (float)k * this.BranchListOfStocks.get(2).Size;
							if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
							{
								branchBound = new BranchBound();
								branchBound.Size = size;
								branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost + (float)j * this.BranchListOfStocks.get(1).Cost + (float)k * this.BranchListOfStocks.get(2).Cost;

								numArray = new int[] { i, j, k };
								this.AddItemToBranchBoundList(branchBound, numArray);
							}
						}
					}
				}
			}
			if ((int)this.MaxStocksQuantity.length == 4)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					for (j = 0; j <= this.MaxStocksQuantity[1]; j++)
					{
						for (k = 0; k <= this.MaxStocksQuantity[2]; k++)
						{
							for (l = 0; l <= this.MaxStocksQuantity[3]; l++)
							{
								BranchAndBound branchAndBound1 = this;
								branchAndBound1.EvaluatedBranchCounter = branchAndBound1.EvaluatedBranchCounter + 1f;
								if (this.EvaluatedBranchCounter % 5000f == 0f)
								{
                                    //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
								}
								size = (float)i * this.BranchListOfStocks.get(0).Size + (float)j * this.BranchListOfStocks.get(1).Size + (float)k * this.BranchListOfStocks.get(2).Size + (float)l * this.BranchListOfStocks.get(3).Size;
								if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
								{
									branchBound = new BranchBound();
									branchBound.Size = size;
									branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost + (float)j * this.BranchListOfStocks.get(1).Cost + (float)k * this.BranchListOfStocks.get(2).Cost + (float)l * this.BranchListOfStocks.get(3).Cost;

									numArray = new int[] { i, j, k, l };
									this.AddItemToBranchBoundList(branchBound, numArray);
								}
							}
						}
					}
				}
			}
			if ((int)this.MaxStocksQuantity.length == 5)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					for (j = 0; j <= this.MaxStocksQuantity[1]; j++)
					{
						for (k = 0; k <= this.MaxStocksQuantity[2]; k++)
						{
							for (l = 0; l <= this.MaxStocksQuantity[3]; l++)
							{
								for (m = 0; m <= this.MaxStocksQuantity[4]; m++)
								{
									BranchAndBound evaluatedBranchCounter2 = this;
									evaluatedBranchCounter2.EvaluatedBranchCounter = evaluatedBranchCounter2.EvaluatedBranchCounter + 1f;
									if (this.BranchBoundList.size() % 5000 == 0)
									{
                                        //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
									}
									size = (float)i * this.BranchListOfStocks.get(0).Size + (float)j * this.BranchListOfStocks.get(1).Size + (float)k * this.BranchListOfStocks.get(2).Size + (float)l * this.BranchListOfStocks.get(3).Size + (float)m * this.BranchListOfStocks.get(4).Size;
									if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
									{
										branchBound = new BranchBound();
										branchBound.Size = size;
										branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost + (float)j * this.BranchListOfStocks.get(1).Cost + (float)k * this.BranchListOfStocks.get(2).Cost + (float)l * this.BranchListOfStocks.get(3).Cost + (float)m * this.BranchListOfStocks.get(4).Cost;

										numArray = new int[] { i, j, k, l, m };
										this.AddItemToBranchBoundList(branchBound, numArray);
									}
								}
							}
						}
					}
				}
			}
			if ((int)this.MaxStocksQuantity.length == 6)
			{
				for (i = 0; i <= this.MaxStocksQuantity[0]; i++)
				{
					for (j = 0; j <= this.MaxStocksQuantity[1]; j++)
					{
						for (k = 0; k <= this.MaxStocksQuantity[2]; k++)
						{
							for (l = 0; l <= this.MaxStocksQuantity[3]; l++)
							{
								for (m = 0; m <= this.MaxStocksQuantity[4]; m++)
								{
									for (int n = 0; n <= this.MaxStocksQuantity[5]; n++)
									{
										BranchAndBound branchAndBound2 = this;
										branchAndBound2.EvaluatedBranchCounter = branchAndBound2.EvaluatedBranchCounter + 1f;
										if (this.BranchBoundList.size() % 10000 == 0)
										{
                                            //this.Label.Text = string.Concat("Branch and Bound. Evaluating branch ", this.EvaluatedBranchCounter.ToString("#,###"), " of ", this.MaxBranch.ToString("#,###"));
										}
										size = (float)i * this.BranchListOfStocks.get(0).Size + (float)j * this.BranchListOfStocks.get(1).Size + (float)k * this.BranchListOfStocks.get(2).Size + (float)l * this.BranchListOfStocks.get(3).Size + (float)m * this.BranchListOfStocks.get(4).Size + (float)n * this.BranchListOfStocks.get(5).Size;
										if ((size < this.TotalItemsSum ? false : size < this.BoundValue))
										{
											branchBound = new BranchBound();
											branchBound.Size = size;
											branchBound.Cost = (float)i * this.BranchListOfStocks.get(0).Cost + (float)j * this.BranchListOfStocks.get(1).Cost + (float)k * this.BranchListOfStocks.get(2).Cost + (float)l * this.BranchListOfStocks.get(3).Cost + (float)m * this.BranchListOfStocks.get(4).Cost + (float)n * this.BranchListOfStocks.get(5).Cost;

											numArray = new int[] { i, j, k, l, m, n };
											this.AddItemToBranchBoundList(branchBound, numArray);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		catch (Exception e)
		{
            //String message = outOfMemoryException.Message;
			//MessageBox.Show("Memory Full!\nThe application will be quitted.\nRetry with less Items or remove some Stocks.", "Bin Packing - Cutting Stock", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
			//Application.Exit();
			return;
		}
	}
    
    private void GetMaxStocksQuantity()
    {
        this.MaxBranch = 1f;
        for (int i = 0; i < (int)this.MaxStocksQuantity.length; i++)
        {
            Stock stock = this.BranchListOfStocks.get(i);
            int maxPieces = (int)Math.ceil((double)(this.BoundValue / stock.Size));
            if ((!stock.StockLimited ? false : (long)maxPieces > (long)stock.MaxPieces))
            {
                maxPieces = (int)stock.MaxPieces;
            }
            this.MaxStocksQuantity[i] = maxPieces;
            BranchAndBound maxBranch = this;
            maxBranch.MaxBranch = maxBranch.MaxBranch * (float)maxPieces;
        }
    }
	
	public class BranchBound
	{
		public float Size;
		public float Cost;
		public ArrayList<Float> SetOfStocks;
        public ArrayList<Float> SetOfStocksMinimumRejects;
        public ArrayList<Float> SetOfStocksCost;

        public BranchBound()
        {
            this.SetOfStocks = new ArrayList<Float>();
            this.SetOfStocksMinimumRejects = new ArrayList<Float>();
            this.SetOfStocksCost = new ArrayList<Float>();
        }
	}
}
