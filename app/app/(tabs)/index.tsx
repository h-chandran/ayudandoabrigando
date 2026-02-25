import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type PickupStatus = 'scheduled' | 'completed' | 'attention';

type Pickup = {
  id: string;
  time: string;
  location: string;
  materials: string;
  status: PickupStatus;
};

const mockKpis = {
  monthKg: 1245,
  todayPickups: 7,
  activeSites: 18,
};

const mockTodayPickups: Pickup[] = [
  {
    id: '1',
    time: '09:30',
    location: 'Escuela San Martín',
    materials: 'Paper, Cardboard',
    status: 'scheduled',
  },
  {
    id: '2',
    time: '11:00',
    location: 'Centro Comunitario Ayudando',
    materials: 'Plastics',
    status: 'attention',
  },
  {
    id: '3',
    time: '15:15',
    location: 'Supermercado Verde',
    materials: 'Glass, Metals',
    status: 'scheduled',
  },
];

const mockAlerts: string[] = [
  'Two collection points are above 80% capacity.',
  '1 pickup from yesterday still marked as pending.',
];

function StatusBadge({ status }: { status: PickupStatus }) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  let backgroundColor = palette.muted;
  let label = 'Scheduled';

  if (status === 'completed') {
    backgroundColor = palette.success;
    label = 'Completed';
  } else if (status === 'attention') {
    backgroundColor = palette.warning;
    label = 'Attention';
  }

  return (
    <View style={[styles.statusBadge, { backgroundColor }]}>
      <ThemedText type="defaultSemiBold" style={styles.statusBadgeText}>
        {label}
      </ThemedText>
    </View>
  );
}

function KpiCard({ label, value, helper }: { label: string; value: string; helper?: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <ThemedView
      style={[
        styles.card,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}>
      <ThemedText type="subtitle" style={styles.cardLabel}>
        {label}
      </ThemedText>
      <ThemedText type="title" style={styles.cardValue}>
        {value}
      </ThemedText>
      {helper ? (
        <ThemedText style={styles.cardHelper} numberOfLines={1}>
          {helper}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

function QuickActionButton({ label, href }: { label: string; href: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];

  return (
    <Link href={href} asChild>
      <ThemedView
        style={[
          styles.quickActionButton,
          {
            backgroundColor: palette.tint,
          },
        ]}>
        <ThemedText type="defaultSemiBold" style={styles.quickActionText}>
          {label}
        </ThemedText>
      </ThemedView>
    </Link>
  );
}

export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.tint,
        dark: Colors.dark.tint,
      }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <ThemedText type="subtitle" style={styles.headerOverline}>
            Ayudando Abrigando
          </ThemedText>
          <ThemedText type="title" style={styles.headerTitle}>
            Today&apos;s impact
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Monitor recycling pickups, collection points, and tasks for your team.
          </ThemedText>
        </ThemedView>
      }>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Key metrics
        </ThemedText>
        <View style={styles.kpiRow}>
          <KpiCard
            label="Kg recycled this month"
            value={`${mockKpis.monthKg.toLocaleString()} kg`}
            helper="Across all materials"
          />
          <KpiCard
            label="Pickups today"
            value={String(mockKpis.todayPickups)}
            helper="Scheduled across all routes"
          />
        </View>
        <View style={styles.singleKpiRow}>
          <KpiCard
            label="Active collection points"
            value={String(mockKpis.activeSites)}
            helper="Schools, partners, and community sites"
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Today&apos;s schedule
        </ThemedText>
        {mockTodayPickups.map((pickup) => (
          <ThemedView key={pickup.id} style={styles.pickupRow}>
            <View style={styles.pickupTimeColumn}>
              <ThemedText type="defaultSemiBold" style={styles.pickupTime}>
                {pickup.time}
              </ThemedText>
              <ThemedText style={styles.pickupMaterials} numberOfLines={1}>
                {pickup.materials}
              </ThemedText>
            </View>
            <View style={styles.pickupMainColumn}>
              <ThemedText type="defaultSemiBold" numberOfLines={1}>
                {pickup.location}
              </ThemedText>
              <StatusBadge status={pickup.status} />
            </View>
          </ThemedView>
        ))}
        <Link href="/(tabs)/schedule" asChild>
          <ThemedText type="link" style={styles.viewAllLink}>
            View full schedule
          </ThemedText>
        </Link>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Alerts & tasks
        </ThemedText>
        {mockAlerts.map((alert, index) => (
          <ThemedView key={index} style={styles.alertCard}>
            <View style={styles.alertDot} />
            <ThemedText style={styles.alertText}>{alert}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick actions
        </ThemedText>
        <View style={styles.quickActionsRow}>
          <QuickActionButton label="Log pickup" href="/modal" />
          <QuickActionButton label="Add collection point" href="/(tabs)/collections" />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 6,
  },
  headerOverline: {
    opacity: 0.9,
  },
  headerTitle: {
    maxWidth: 260,
  },
  headerSubtitle: {
    maxWidth: 320,
    opacity: 0.9,
  },
  section: {
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
  },
  singleKpiRow: {
    marginTop: 12,
  },
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
  },
  cardLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    marginBottom: 4,
  },
  cardHelper: {
    fontSize: 12,
    opacity: 0.8,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pickupTimeColumn: {
    width: 92,
    marginRight: 8,
  },
  pickupTime: {
    fontSize: 16,
  },
  pickupMaterials: {
    fontSize: 12,
    opacity: 0.8,
  },
  pickupMainColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 12,
    color: '#ffffff',
  },
  viewAllLink: {
    marginTop: 4,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E9A100',
  },
  alertText: {
    flex: 1,
    fontSize: 13,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#ffffff',
  },
})
