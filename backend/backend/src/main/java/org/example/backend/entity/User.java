package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class User {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private String email;

    private String password;

//    @Enumerated(EnumType.STRING)
//    private Role role;
//
//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "details_id")
//    private UserDetails details;
//
//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "wishlist_id")
//    private WishList userWishList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> userOrders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> userReviews;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_id")
    private Cart cart;

//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "payment_info_id")
//    private PaymentDetails paymentInfo;

    // Gettery i settery


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public Role getRole() {
//        return role;
//    }
//
//    public void setRole(Role role) {
//        this.role = role;
//    }

//    public UserDetails getDetails() {
//        return details;
//    }
//
//    public void setDetails(UserDetails details) {
//        this.details = details;
//    }

//    public WishList getUserWishList() {
//        return userWishList;
//    }
//
//    public void setUserWishList(WishList userWishList) {
//        this.userWishList = userWishList;
//    }
//
//    public List<Order> getUserOrders() {
//        return userOrders;
//    }
//
//    public void setUserOrders(List<Order> userOrders) {
//        this.userOrders = userOrders;
//    }
//
//    public List<Review> getUserReviews() {
//        return userReviews;
//    }
//
//    public void setUserReviews(List<Review> userReviews) {
//        this.userReviews = userReviews;
//    }
//
//    public Cart getCart() {
//        return cart;
//    }
//
//    public void setCart(Cart cart) {
//        this.cart = cart;
//    }

//    public PaymentDetails getPaymentInfo() {
//        return paymentInfo;
//    }
//
//    public void setPaymentInfo(PaymentDetails paymentInfo) {
//        this.paymentInfo = paymentInfo;
//    }
}