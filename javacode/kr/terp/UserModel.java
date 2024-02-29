package kr.terp;

/**
 * Created by jiscraft on 2015-12-11.
 */
public class UserModel {
    private String name;
    private String address;
    private String userId;
    private String password;

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }
    public void setAddress(String address){
        this.address = address;
    }
    public String getAddress(){
        return this.address;
    }
    public void setUserId(String id){
        this.userId = userId;
    }
    public String getUserId(){
        return this.userId;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return this.password;
    }
}
