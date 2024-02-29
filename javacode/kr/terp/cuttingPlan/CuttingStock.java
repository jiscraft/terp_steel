package kr.terp.cuttingPlan;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


public class CuttingStock {
    private Boolean ExitGreedyNextFit;
    //private int NumberOfPermutations = 1;
    private int myPermutationCounter;
    private Boolean HasFoundAbsoluteBestSolution = false;
    private Boolean searchAbsoluteBestSolution;
    private int[] myLexicographicOrder;
    private ArrayList<Bin> GreedyNextFitSolution = new ArrayList<Bin>();
    private float TotalItemsSum;
    private ArrayList<Stock> ListOfStocks;
    private ArrayList<Item> ListOfItems;
    HashMap<String, ArrayList<Bin>> SetOfSolutions = new HashMap<String,ArrayList<Bin>>();
    public ArrayList<ResultGroup> Result;

    public CuttingStock(ArrayList<Stock> theStocks, ArrayList<Item> theItems, Boolean exitGreedyNextFit)
    {
        this.TotalItemsSum = 0;
        for (int ix = 0; ix < theItems.size(); ix++)
        {
            Item item = theItems.get(ix);
            this.TotalItemsSum += item.Pieces * item.Size;
        }

        this.ExitGreedyNextFit = exitGreedyNextFit;
        this.ListOfStocks = new ArrayList<Stock>();
        for (int ix = 0; ix < theStocks.size(); ix++)
        {
            Stock theStock = theStocks.get(ix);
            if (theStock.Size > 0f)
            {
                this.ListOfStocks.add(theStock);
            }
        }

        this.ListOfItems = new ArrayList<Item>();
        for (int ix = 0; ix < theItems.size(); ix++)
        {
            Item theItem = theItems.get(ix);
            for (int i = 1; (long)i <= (long)theItem.Pieces; i++)
            {
                if (theItem.Size > 0f)
                {
                    this.ListOfItems.add(theItem);
                }
            }
        }
    }

    private void AssignItem(Bin myElement, Item myItemToAssign)
    {
        myElement.ItemsAssigned.add(myItemToAssign);
        Bin employ = myElement;
        employ.Employ = employ.Employ + myItemToAssign.Size;
        Bin reject = myElement;
        reject.Reject = reject.Reject - myItemToAssign.Size;
    }

    private Boolean CheckIfSolutionCanExist()
    {
        Boolean flag;
        NonIncreasingSortOnStockSize nonIncreasingSortOnStockSize = new NonIncreasingSortOnStockSize();
        this.ListOfStocks.sort(nonIncreasingSortOnStockSize);
        NonIncreasingSortOnItemSize nonIncreasingSortOnItemSize = new NonIncreasingSortOnItemSize();
        this.ListOfItems.sort(nonIncreasingSortOnItemSize);
        //String empty = "";
        if (this.ListOfStocks.get(0).MinimumReject > 0f)
        {
            //float minimumReject = this.ListOfStocks.get(0).MinimumReject;
            //empty = "the minimum reject required is " + minimumReject;
        }
        if (this.ListOfItems.get(0).Size <= this.ListOfStocks.get(0).Size - this.ListOfStocks.get(0).MinimumReject)
        {
            flag = true;
        }
        else
        {
            //Object[] size = new Object[] { "Stocks too small.\n\n The biggest Stock is ", this.ListOfStocks.get(0).Size, ", ", empty, ", the biggest Item is ", this.ListOfItems.get(0).Size, ".\n\nA solution can't exist." };
            //MessageBox.Show(string.Concat(size), "Bin Packing - Cutting Stock", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
            flag = false;
        }
        return flag;
    }

    private void DownSize(ArrayList<Bin> mySolution)
    {
        for (int ix = 0; ix < mySolution.size(); ix++)
        {
            Bin size = mySolution.get(ix);
            if (size.Reject > 0f)
            {
                int count = this.ListOfStocks.size() - 1;
                while (count >= 0)
                {
                    if (size.Employ > this.ListOfStocks.get(count).Size - this.ListOfStocks.get(count).MinimumReject)
                    {
                        count--;
                    }
                    else
                    {
                        size.Stock = this.ListOfStocks.get(count).Size;
                        size.Cost = this.ListOfStocks.get(count).Cost;
                        size.Reject = size.Stock - size.Employ;
                        break;
                    }
                }
            }
        }
    }

    private float GetSize(String theKey)
    {
        float stock = 0f;
        if (this.SetOfSolutions.get(theKey) != null)
        {
            for (int ix = 0; ix < this.SetOfSolutions.keySet().size(); ix++)
            {
                Bin item = this.SetOfSolutions.get(theKey).get(ix);
                stock = stock + item.Stock;
            }
        }
        return stock;
    }

    private ArrayList<Bin> GreedyBestFit(ArrayList<BranchAndBound.BranchBound> myBranchList)
    {
        ArrayList<Bin> bins;
        ArrayList<Bin> bins1 = new ArrayList<Bin>();
        ArrayList<Bin> list = new ArrayList<Bin>();
        Boolean flag = false;
        for (int ix = 0; ix < myBranchList.size(); ix++)
        {
            BranchAndBound.BranchBound branchBound = myBranchList.get(ix);
            int num = 0;
            if (flag == false)
            {
                bins1.clear();
                int num1 = 0;
                bins1.add(new Bin(branchBound.SetOfStocks.get(num1), branchBound.SetOfStocksCost.get(num1), branchBound.SetOfStocksMinimumRejects.get(num1)));
                for (int iy = 0; iy < this.ListOfItems.size(); iy++)
                {
                    Item listOfItem = this.ListOfItems.get(iy);
                    if (listOfItem.Size > bins1.get(bins1.size() - 1).Reject)
                    {
                        ArrayList<Bin> reject = new ArrayList<Bin>();
                        for (int ix_b = 0; ix_b < bins1.size(); ix_b++)
                        {
                            Bin el = bins1.get(ix_b);
                            if (el.Reject >= listOfItem.Size)
                            {
                                reject.add(el);
                            }
                        }
                        reject.sort(new NonIncreasingSortReject());

                        list.clear();
                        list = reject;
                        if (list.size() == 0)
                        {
                            num1++;
                            if ((num1 == (int)branchBound.SetOfStocks.size() ? false : listOfItem.Size <= branchBound.SetOfStocks.get(num1) - branchBound.SetOfStocksMinimumRejects.get(num1)))
                            {
                                bins1.add(new Bin(branchBound.SetOfStocks.get(num1), branchBound.SetOfStocksCost.get(num1), branchBound.SetOfStocksMinimumRejects.get(num1)));
                                this.AssignItem(bins1.get(bins1.size() - 1), listOfItem);
                                num++;
                                if (num == this.ListOfItems.size())
                                {
                                    flag = true;
                                }
                            }
                            else
                            {
                                break;
                            }
                        }
                        else
                        {
                            this.AssignItem(list.get(0), listOfItem);
                            num++;
                            if (num == this.ListOfItems.size())
                            {
                                flag = true;
                            }
                        }
                    }
                    else
                    {
                        this.AssignItem(bins1.get(bins1.size() - 1), listOfItem);
                        num++;
                        if (num == this.ListOfItems.size())
                        {
                            flag = true;
                        }
                    }
                }
            }
            else
            {
                break;
            }
        }
        if (!flag)
        {
            bins = null;
        }
        else
        {
            this.QualifySolution(bins1);
            bins = bins1;
        }
        return bins;
    }

    private ArrayList<Bin> GreedyFirstFit()
    {
        ArrayList<Bin> bins = new ArrayList<Bin>();
        bins.add(new Bin(this.ListOfStocks.get(0).Size, this.ListOfStocks.get(0).Cost, this.ListOfStocks.get(0).MinimumReject));
        ArrayList<Bin> list = new ArrayList<Bin>();
        for (int ix = 0; ix < this.ListOfItems.size(); ix++)
        {
            Item listOfItem = this.ListOfItems.get(ix);
            if (listOfItem.Size > bins.get(bins.size() - 1).Reject)
            {
                ArrayList<Bin> reject = new ArrayList<Bin>();
                for (int ix_b = 0; ix_b < bins.size(); ix_b++)
                {
                    Bin el = bins.get(ix_b);
                    if (el.Reject >= listOfItem.Size)
                    {
                        reject.add(el);
                    }
                }
                reject.sort(new NonIncreasingSortReject());

                list.clear();
                list = reject;
                if (list.size() == 0)
                {
                    bins.add(new Bin(this.ListOfStocks.get(0).Size, this.ListOfStocks.get(0).Cost, this.ListOfStocks.get(0).MinimumReject));
                    this.AssignItem(bins.get(bins.size() - 1), listOfItem);
                }
                else
                {
                    this.AssignItem(list.get(0), listOfItem);
                }
            }
            else
            {
                this.AssignItem(bins.get(bins.size() - 1), listOfItem);
            }
        }
        this.DownSize(bins);
        this.QualifySolution(bins);
        this.DownSize(bins);
        return bins;
    }

    private void GreedyNextFit(BranchAndBound.BranchBound branch, int mybranchCounter, int myBranchListCount)
    {
        Collections.sort(branch.SetOfStocks);
        NonDecreasingSortOnItemSize nonDecreasingSortOnItemSize = new NonDecreasingSortOnItemSize();
        this.ListOfItems.sort(nonDecreasingSortOnItemSize);
        if (this.ListOfItems.get(this.ListOfItems.size() - 1).Size <= branch.SetOfStocks.get((int)branch.SetOfStocks.size() - 1))
        {
            this.InitializeLexicographicArray();
            this.InitializeSolution(branch);
            this.myPermutationCounter = 1;
            this.searchAbsoluteBestSolution = true;
            while (this.searchAbsoluteBestSolution)
            {
                this.GreedyNextFitProcedure(branch, mybranchCounter, myBranchListCount);
                if (this.GreedyNextFitSolution == null)
                {
                    this.searchAbsoluteBestSolution = false;
                }
            }
        }
    }

    private void GreedyNextFitProcedure(BranchAndBound.BranchBound branch, int thebranchCounter, int theBranchListCount)
    {
        int num = 0;
        int[] numArray = this.myLexicographicOrder;
        int num1 = 0;
        while (true)
        {
            if (num1 < (int)numArray.length)
            {
                int num2 = numArray[num1];
                if (!this.ExitGreedyNextFit)
                {
                    if (this.GreedyNextFitSolution.get(num).Reject >= this.ListOfItems.get(num2).Size)
                    {
                        this.AssignItem(this.GreedyNextFitSolution.get(num), this.ListOfItems.get(num2));
                    }
                    else if (!(num > this.GreedyNextFitSolution.size() - 2 ? true : this.GreedyNextFitSolution.get(num + 1).Reject < this.ListOfItems.get(num2).Size))
                    {
                        num++;
                        this.AssignItem(this.GreedyNextFitSolution.get(num), this.ListOfItems.get(num2));
                    }
                    else if (!this.NextPermutation())
                    {
                        this.searchAbsoluteBestSolution = false;
                        break;
                    }
                    else
                    {
                        this.InitializeSolution(branch);
                        CuttingStock cuttingStock = this;
                        cuttingStock.myPermutationCounter = cuttingStock.myPermutationCounter + 1;
                        break;
                    }
                    num1++;
                }
                else
                {
                    this.searchAbsoluteBestSolution = false;
                    break;
                }
            }
            else
            {
                this.QualifySolution(this.GreedyNextFitSolution);
                this.HasFoundAbsoluteBestSolution = true;
                this.searchAbsoluteBestSolution = false;
                break;
            }
        }
    }

    private void InitializeLexicographicArray()
    {
        this.myLexicographicOrder = new int[this.ListOfItems.size()];
        for (int i = 0; i < (int)this.myLexicographicOrder.length; i++)
        {
            this.myLexicographicOrder[i] = i;
        }
    }

    private void InitializeSolution(BranchAndBound.BranchBound branch)
    {
        this.GreedyNextFitSolution.clear();
        for (int i = 0; i < (int)branch.SetOfStocks.size(); i++)
        {
            this.GreedyNextFitSolution.add(new Bin(branch.SetOfStocks.get(i), branch.SetOfStocksCost.get(i), branch.SetOfStocksMinimumRejects.get(i)));
        }
    }

    private Boolean NextPermutation()
    {
        Boolean flag;
        int length = (int)this.myLexicographicOrder.length - 1;
        while (true)
        {
            if (this.myLexicographicOrder[length - 1] >= this.myLexicographicOrder[length])
            {
                length--;
                if (length == 0)
                {
                    flag = false;
                    break;
                }
            }
            else
            {
                int i = (int)this.myLexicographicOrder.length;
                while (this.myLexicographicOrder[i - 1] <= this.myLexicographicOrder[length - 1])
                {
                    i--;
                }
                this.Swap(length - 1, i - 1);
                length++;
                for (i = (int)this.myLexicographicOrder.length; length < i; i--)
                {
                    this.Swap(length - 1, i - 1);
                    length++;
                }
                flag = true;
                break;
            }
        }
        return flag;
    }

    private ArrayList<String> PrintSolution(float absoluteBestSize, float bestCost, HashMap<String, ArrayList<Bin>> mySetOfSolutions)
    {
        ArrayList<String> result = new ArrayList<String>();
        for (Map.Entry<String, ArrayList<Bin>> mySetOfSolution : mySetOfSolutions.entrySet())
        {
            if (mySetOfSolution.getValue() != null)
            {
                String stringBuilder = "";
                stringBuilder += "SOLUTION:  " + mySetOfSolution.getKey() + "\r\n";
                float stock = 0f;
                float employ = 0f;
                float cost = 0f;
                for (int ix1 = 0; ix1 < mySetOfSolution.getValue().size();ix1++)
                {
                    Bin value = mySetOfSolution.getValue().get(ix1);
                    stock = stock + value.Stock;
                    employ = employ + value.Employ;
                    cost = cost + value.Cost;
                }
                float single = (float)Math.round((double)((stock - employ) / stock) * 100d);
                String[] str = new String[] { "Absolute Best Size:  ",
                        String.format("%,4.3f", absoluteBestSize), "\t\tBest Cost:  ", //.ToString("#,###.###")
                        String.format("%,4.3f", bestCost), "\nSum of Stocks used:  ",	 //bestCost.ToString("#,##0.###"
                        String.format("%,4.3f", stock), " \t\tSum of Items:  ",	 	 //stock.ToString("#,###.###")
                        String.format("%,4.3f", this.TotalItemsSum), " \tReject:  ",	 //this.TotalItemsSum.ToString("#,###.###")
                        String.format("%,4.3f", single) + "%", "\nCost of this solution:  ", //single.ToString("#0.0##%")
                        String.format("%,4.3f", cost) };								 //cost.ToString("#,##0.###")

                for (int ix = 0; ix < str.length;ix++ )
                    stringBuilder += str[ix];

                stringBuilder += "\r\n";
                for (int ix1 = 0; ix1 < mySetOfSolution.getValue().size(); ix1++)
                {
                    Bin bin = mySetOfSolution.getValue().get(ix1);

                    stringBuilder += "\r\n";
                    stringBuilder += "---" + "\r\n";
                    Object[] minReject = new Object[] { "Stock  ", null, null, null, null, null, null, null, null, null };
                    float size = bin.Stock;
                    minReject[1] = size;
                    minReject[2] = "  \tcost  ";
                    size = bin.Cost;
                    minReject[3] = String.format("%,4.3f", size); //size.ToString("#,###.##");
                    minReject[4] = "  \tused  ";
                    size = bin.Employ;
                    minReject[5] = String.format("%,4.3f", size); //size.ToString("#,###.##");
                    minReject[6] = "\treject  ";
                    double num = Math.round((double)(bin.Stock - bin.Employ) * 10d) / 10;
                    minReject[7] = num;
                    minReject[8] = "  \tminimum reject  ";
                    minReject[9] = bin.MinReject;
                    for (int ix = 0; ix < minReject.length; ix++)
                        stringBuilder += minReject[ix];
                    stringBuilder += "\r\n";
                    for (int ix2 = 0; ix2 < bin.ItemsAssigned.size(); ix2++)
                    {
                        Item itemsAssigned = bin.ItemsAssigned.get(ix2);

                        size = itemsAssigned.Size;
                        stringBuilder += "\t[" + itemsAssigned.PartName + "]";
                        stringBuilder += size;
                    }
                    stringBuilder += "\r\n";

                }

                result.add(stringBuilder);
            }
        }

        return result;
    }

    private void SetResult(float absoluteBestSize, float bestCost, HashMap<String, ArrayList<Bin>> mySetOfSolutions)
    {
        ArrayList<ResultGroup> listResultGroup = new ArrayList<ResultGroup>();
        for (Map.Entry<String, ArrayList<Bin>> mySetOfSolution : mySetOfSolutions.entrySet())
        {
            if (mySetOfSolution.getValue() != null)
            {
                ResultGroup resultGroup = new ResultGroup();
                resultGroup.Solution = mySetOfSolution.getKey();
                float stock = 0f;
                float employ = 0f;
                float cost = 0f;
                for (int ix1 = 0; ix1 < mySetOfSolution.getValue().size();ix1++)
                {
                    Bin value = mySetOfSolution.getValue().get(ix1);

                    stock = stock + value.Stock;
                    employ = employ + value.Employ;
                    cost = cost + value.Cost;
                }
                float single = (float)Math.round((double)((stock - employ) / stock) * 100d);

                resultGroup.AbsoluteBestSize = absoluteBestSize;
                resultGroup.BestCost = bestCost;
                resultGroup.SumOfStocksUsed = stock;
                resultGroup.SumOfItems = this.TotalItemsSum;
                resultGroup.Reject = single;
                resultGroup.CostOfThisSolution = cost;

                for (int ix1 = 0; ix1 < mySetOfSolution.getValue().size(); ix1++)
                {
                    Bin bin = mySetOfSolution.getValue().get(ix1);

                    ResultItem resultItem = new ResultItem();
                    resultItem.Stock = bin.Stock;
                    resultItem.Cost = bin.Cost;
                    resultItem.Used = bin.Employ;
                    resultItem.ReJect = Math.round((double)(bin.Stock - bin.Employ) * 10d) / 10;
                    resultItem.MinimumReject = bin.MinReject;

                    for (int ix2 = 0; ix2 < bin.ItemsAssigned.size(); ix2++)
                    {
                        Item itemsAssigned = bin.ItemsAssigned.get(ix2);

                        resultItem.ListSplice.add(itemsAssigned.Size);
                        resultItem.ListPartName.add(itemsAssigned.PartName);
                    }

                    resultGroup.ListResultItem.add(resultItem);
                }

                listResultGroup.add(resultGroup);
            }
        }

        this.Result = listResultGroup;
    }

    private void QualifySolution(ArrayList<Bin> mySolution)
    {
        ArrayList<Bin> bins = new ArrayList<Bin>();
        for (int i = mySolution.size() - 1; i > 0; i--)
        {
            mySolution.get(i).TheBinIsLINQable = false;
            for (int j = 0; j < mySolution.get(i).ItemsAssigned.size(); j++)
            {
                ArrayList<Bin> bins1 = new ArrayList<Bin>();
                for (int ix_b = 0; ix_b < mySolution.size(); ix_b++)
                {
                    Bin el = mySolution.get(ix_b);
                    if (!el.TheBinIsLINQable ? false : el.Reject >= mySolution.get(i).ItemsAssigned.get(j).Size)
                    {
                        bins1.add(el);
                    }
                }
                bins1.sort(new NonIncreasingSortReject());
                bins.clear();
                bins = bins1;
                if (bins.size() != 0)
                {
                    this.AssignItem(bins.get(0), mySolution.get(i).ItemsAssigned.get(j));
                    this.RemoveItem(mySolution.get(i), mySolution.get(i).ItemsAssigned.get(j));
                    j--;
                }
            }
        }

        for (int ix = 0; ix < mySolution.size(); ix++)
        {
            Bin bin = mySolution.get(ix);
            if (bin.ItemsAssigned.size() == 0)
            {
                mySolution.remove(bin);
                ix--;
            }
        }
    }

    private void RemoveItem(Bin myElement, Item myItemToRemove)
    {
        Bin employ = myElement;
        employ.Employ = employ.Employ - myItemToRemove.Size;
        Bin reject = myElement;
        reject.Reject = reject.Reject + myItemToRemove.Size;
        myElement.ItemsAssigned.remove(myItemToRemove);
    }

    public ArrayList<String> Solve()
    {
        ArrayList<String> result = new ArrayList<String>();
        float size = 0f;
        if (this.CheckIfSolutionCanExist())
        {
            ArrayList<Bin> bins = new ArrayList<Bin>();
            bins = this.GreedyFirstFit();
            this.SetOfSolutions.put("Bound Solution", bins);
            size = this.GetSize("Bound Solution");
            BranchAndBound branchAndBound = new BranchAndBound(this.ListOfStocks, this.ListOfItems, this.TotalItemsSum, size);
            ArrayList<BranchAndBound.BranchBound> branchBounds = new ArrayList<BranchAndBound.BranchBound>();
            branchBounds = branchAndBound.GetBranchAndBound();
            if (branchBounds.size() != 0)
            {
                branchBounds.sort(new NonDecreasingSortOnBranchAndBoundCost());
                float cost = branchBounds.get(0).Cost;
                branchBounds.sort(new NonDecreasingSortOnBranchAndBoundSize());

                this.SetOfSolutions.put("Best Size Solution", this.GreedyBestFit(branchBounds));
                float single = branchBounds.get(0).Size;
                float size1 = this.GetSize("Best Size Solution");
                if ((size1 <= 0f || single < size1 ? this.ListOfItems.size() <= 12 : false))
                {
                    for (int ix = 0; ix < branchBounds.size(); ix++)
                    {
                        BranchAndBound.BranchBound branch = branchBounds.get(ix);
                        if (branch.Size > single)
                        {
                            branchBounds.remove(branch);
                            ix--;
                        }
                    }

                    int num = 0;
                    for (int ix = 0; ix < branchBounds.size(); ix++)
                    {
                        BranchAndBound.BranchBound branchBound = branchBounds.get(ix);
                        num++;
                        this.GreedyNextFit(branchBound, num, branchBounds.size());
                        if (this.HasFoundAbsoluteBestSolution)
                        {
                            this.SetOfSolutions.put("Absolute Best Size Solution", this.GreedyNextFitSolution);
                            break;
                        }
                    }
                    result = this.PrintSolution(single, cost, this.SetOfSolutions);
                    this.SetResult(single, cost, this.SetOfSolutions);
                }
                else
                {
                    result = this.PrintSolution(single, cost, this.SetOfSolutions);
                    this.SetResult(single, cost, this.SetOfSolutions);
                }
            }
            else
            {
                result = this.PrintSolution(0f, 0f, this.SetOfSolutions);
                this.SetResult(0f, 0f, this.SetOfSolutions);
            }
        }

        return result;
    }

    private void Swap(int i, int j)
    {
        int num = this.myLexicographicOrder[i];
        this.myLexicographicOrder[i] = this.myLexicographicOrder[j];
        this.myLexicographicOrder[j] = num;
    }
}
