package kr.terp.cuttingPlan;


import java.util.ArrayList;


public class Program {
    public static void main(String[] args)
    {
        //System.out.println("Hello World");
        ArrayList<Stock> stocks = new ArrayList<Stock>();
        stocks.add(new Stock(3, 1000));

        ArrayList<Item> items = new ArrayList<Item>();
        items.add(new Item("P1", 3, 5600));
        items.add(new Item("P2", 4, 2000));

        CuttingStock cuttingStock = new CuttingStock(stocks, items, false);
        ArrayList<String> listText = cuttingStock.Solve();
        //cuttingStock.Result
        for(int ix = 0;ix <listText.size();ix++ )
        {
            String text = listText.get(ix);
            System.out.println(text);
        }

        String[]  arrayList = null;
        String item;
        for(int ix = 0;ix <listText.size();ix++ )
        {
            String text = listText.get(ix);
            String[] textSplit = text.split("---");
            arrayList = textSplit;
        }
    }

}
