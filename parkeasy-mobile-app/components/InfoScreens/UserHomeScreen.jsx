import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Search,
  Share2,
  Plus,
  Car,
  Bike,
  Building2,
  Building,
  UtensilsCrossed,
  Home,
  Gift,
  Ticket,
  Users,
} from "lucide-react-native";
import MapView from "react-native-maps";

export default function Component() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "/placeholder.svg" }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userName}>Kaarthikeyan S V</Text>
              <Text style={styles.location}>Chennai</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Search color="#000" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Share2 color="#000" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.addVehicleButton}>
            <Plus color="#000" size={20} />
            <Text style={styles.buttonText}>Add Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.earnButton}>
            <Text style={styles.earnButtonText}>Earn with us!</Text>
          </TouchableOpacity>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Around you</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 13.0827,
              longitude: 80.2707,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* <Marker coordinate={{ latitude: 13.0827, longitude: 80.2707 }} /> */}
          </MapView>
        </View>

        {/* Parking Availability */}
        <View style={styles.parkingTypes}>
          <Text style={styles.sectionTitle}>Parking Availability</Text>
          <View style={styles.parkingToggle}>
            <TouchableOpacity
              style={[styles.toggleButton, styles.activeToggle]}
            >
              <Car color="#000" size={20} />
              <Text style={styles.toggleText}>Car</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton}>
              <Bike color="#fff" size={20} />
              <Text style={[styles.toggleText, styles.inactiveText]}>Bike</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Parking Services */}
        <View style={styles.services}>
          <Text style={styles.sectionTitle}>Parking Services</Text>
          <View style={styles.serviceGrid}>
            <TouchableOpacity style={styles.serviceItem}>
              <Building2 color="#fff" size={24} />
              <Text style={styles.serviceText}>Workplace</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <Building color="#fff" size={24} />
              <Text style={styles.serviceText}>Shopping Mall</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <UtensilsCrossed color="#fff" size={24} />
              <Text style={styles.serviceText}>Restaurants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceItem}>
              <Home color="#fff" size={24} />
              <Text style={styles.serviceText}>Residential area</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium Plans */}
        <View style={styles.premiumPlans}>
          <Text style={styles.sectionTitle}>Premium Plans</Text>
          <View style={styles.planCards}>
            <TouchableOpacity style={styles.planCard}>
              <Text style={styles.planTitle}>Monthly Parking</Text>
              <Text style={styles.planDescription}>
                Dedicated parking available near you.
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreText}>Explore Now →</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.planCard}>
              <Text style={styles.planTitle}>Yearly Parking</Text>
              <Text style={styles.planDescription}>
                Dedicated parking available near you.
              </Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreText}>Explore Now →</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.trending}>
          <Text style={styles.sectionTitle}>Trending</Text>
          <TouchableOpacity style={styles.trendingCard}>
            <View>
              <Text style={styles.saveAmount}>Save ₹500</Text>
              <Text style={styles.offerTitle}>On Your First EV Parking</Text>
              <Text style={styles.offerDescription}>
                We provide dedicated monthly parking with surveillance
              </Text>
              <View style={styles.customerCount}>
                <Text style={styles.countText}>100 +</Text>
                <Text style={styles.countLabel}>Happy Customers</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Exclusive Offers */}
        <View style={styles.exclusiveOffers}>
          <Text style={styles.sectionTitle}>Exclusive Offers</Text>
          <View style={styles.offerGrid}>
            <TouchableOpacity style={styles.offerItem}>
              <Gift color="#FFD60A" size={24} />
              <Text style={styles.offerText}>Rewards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offerItem}>
              <Ticket color="#FFD60A" size={24} />
              <Text style={styles.offerText}>Discounts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offerItem}>
              <Users color="#FFD60A" size={24} />
              <Text style={styles.offerText}>Refer & Win</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home color="#FFD60A" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Car color="#666" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ticket color="#666" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Users color="#666" size={24} />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    color: "#666",
    fontSize: 14,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFD60A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
  },
  addVehicleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFD60A",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  earnButton: {
    flex: 1,
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  earnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mapContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  map: {
    height: 200,
    borderRadius: 12,
  },
  parkingTypes: {
    padding: 16,
  },
  parkingToggle: {
    flexDirection: "row",
    gap: 12,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  activeToggle: {
    backgroundColor: "#FFD60A",
    borderColor: "#FFD60A",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inactiveText: {
    color: "#fff",
  },
  services: {
    padding: 16,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  serviceItem: {
    width: "48%",
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 8,
  },
  serviceText: {
    color: "#fff",
    fontSize: 14,
  },
  premiumPlans: {
    padding: 16,
  },
  planCards: {
    gap: 12,
  },
  planCard: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  planTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  planDescription: {
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: "#FFD60A",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  exploreText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "600",
  },
  trending: {
    padding: 16,
  },
  trendingCard: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
  },
  saveAmount: {
    color: "#FFD60A",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  offerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  offerDescription: {
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
  },
  customerCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  countText: {
    color: "#FFD60A",
    fontSize: 16,
    fontWeight: "bold",
  },
  countLabel: {
    color: "#666",
    fontSize: 14,
  },
  exclusiveOffers: {
    padding: 16,
  },
  offerGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offerItem: {
    alignItems: "center",
    gap: 8,
  },
  offerText: {
    color: "#fff",
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  navItem: {
    alignItems: "center",
  },
});
