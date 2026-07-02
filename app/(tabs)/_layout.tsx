import { Tabs } from "expo-router"

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="albumScreen/[userId]" options={{ title: "Albums" }} />
            <Tabs.Screen name="profileScreen/[userId]" options={{ title: "Profile" }} />
        </Tabs>
    )   
}

