import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppStore } from "../../lib/store";

export default function LoginScreen() {
  const router = useRouter();
  const { setIsAuthenticated } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Animation for gradient movement and lavender glow
  const gradientAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth gradient movement animation
    const startGradientAnimation = () => {
      Animated.loop(
        Animated.timing(gradientAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        })
      ).start();
    };

    // Lavender glow breathing animation
    const startGlowAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    startGradientAnimation();
    startGlowAnimation();
  }, []);

  const handleLogin = () => {
    // For now, just accept any credentials and log the user in
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    } else {
      Alert.alert("Error", "Please enter both email and password");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Purple aura glow from edges */}
      <Animated.View
        style={[
          styles.topAura,
          {
            opacity: glowAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.15, 0.35],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bottomAura,
          {
            opacity: glowAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.25],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.leftAura,
          {
            opacity: glowAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.08, 0.2],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.rightAura,
          {
            opacity: glowAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.08, 0.2],
            }),
          },
        ]}
      />

      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.title,
            {
              textShadowRadius: glowAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 40],
              }),
            },
          ]}
        >
          Log In
        </Animated.Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Need an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}>Sign up here</Text>
          </Pressable>
        </View>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.glassContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="hello@reallygreatsite.com"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.glassContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          
          <Animated.View
            style={[
              styles.loginButton,
              {
                shadowOpacity: glowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 0.8],
                }),
                shadowRadius: glowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [15, 30],
                }),
              },
            ]}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6', '#ec4899', '#f472b6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              {/* First animated gradient layer */}
              <Animated.View
                style={[
                  styles.gradientLayer,
                  {
                    opacity: gradientAnimation.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [0.8, 0.3, 0.8, 0.8],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)', 'rgba(99, 102, 241, 0.8)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.innerGradient}
                />
              </Animated.View>

              {/* Second animated gradient layer */}
              <Animated.View
                style={[
                  styles.gradientLayer,
                  {
                    opacity: gradientAnimation.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [0.3, 0.8, 0.3, 0.3],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={['rgba(236, 72, 153, 0.6)', 'rgba(244, 114, 182, 0.6)', 'rgba(139, 92, 246, 0.6)']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.innerGradient}
                />
              </Animated.View>

              {/* Shimmer effect */}
              <Animated.View
                style={[
                  styles.shimmerEffect,
                  {
                    transform: [
                      {
                        translateX: gradientAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-200, 200],
                        }),
                      },
                    ],
                    opacity: gradientAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.2, 0.6, 0.2],
                    }),
                  },
                ]}
              />

              <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [styles.loginButtonInner, pressed && { opacity: 0.9 }]}
              >
                <Text style={styles.loginButtonText}>Log In</Text>
              </Pressable>
            </LinearGradient>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: "#000000",
    justifyContent: "center",
    paddingHorizontal: 32,
    position: "relative",
  },
  topAura: {
    position: "absolute",
    top: -50,
    left: "20%",
    right: "20%",
    height: 100,
    backgroundColor: "rgba(139, 92, 246, 0.15)",
    borderRadius: 50,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.6,
    shadowRadius: 80,
    elevation: 8,
  },
  bottomAura: {
    position: "absolute",
    bottom: -50,
    left: "10%",
    right: "10%",
    height: 100,
    backgroundColor: "rgba(168, 85, 247, 0.12)",
    borderRadius: 50,
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: -30 },
    shadowOpacity: 0.5,
    shadowRadius: 70,
    elevation: 6,
  },
  leftAura: {
    position: "absolute",
    left: -50,
    top: "30%",
    bottom: "30%",
    width: 100,
    backgroundColor: "rgba(192, 132, 252, 0.1)",
    borderRadius: 50,
    shadowColor: "#c084fc",
    shadowOffset: { width: 30, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 4,
  },
  rightAura: {
    position: "absolute",
    right: -50,
    top: "25%",
    bottom: "25%",
    width: 100,
    backgroundColor: "rgba(192, 132, 252, 0.1)",
    borderRadius: 50,
    shadowColor: "#c084fc",
    shadowOffset: { width: -30, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 4,
  },
  container: { 
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  title: { 
    fontSize: 48, 
    fontWeight: "200", 
    color: "#c084fc", 
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 8,
    textShadowColor: "rgba(192, 132, 252, 0.8)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    textTransform: "uppercase",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  subtitleText: { 
    fontSize: 16, 
    color: "#888888", 
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  signupLink: {
    fontSize: 16,
    color: "#c084fc",
    fontFamily: "Inter_600SemiBold",
    textDecorationLine: "underline",
    textShadowColor: "rgba(192, 132, 252, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  form: {
    width: "100%",
    gap: 32,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
    color: "#888888",
    letterSpacing: 2,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  glassContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  loginButton: {
    borderRadius: 25,
    marginTop: 40,
    shadowColor: "#c084fc",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  gradientButton: {
    borderRadius: 25,
    overflow: "hidden",
    position: "relative",
  },
  gradientLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  innerGradient: {
    flex: 1,
    borderRadius: 25,
  },
  shimmerEffect: {
    position: "absolute",
    top: 0,
    left: -100,
    right: -100,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 25,
    width: "200%",
  },
  loginButtonInner: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});