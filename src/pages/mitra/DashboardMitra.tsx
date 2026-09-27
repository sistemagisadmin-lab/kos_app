import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Rect, Circle, G, Line } from 'react-native-svg';
import KamarMitra, {
  KosProperty,
  KosRoomType,
  defaultKosProperties,
  RoomItem,
  initialRooms,
} from './KamarMitra';
import * as ImagePicker from 'expo-image-picker';
import {
  User,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Search,
  Building2,
  DoorClosed,
  Receipt,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Home,
  Wallet,
  Settings,
  Coins,
  Calendar,
  X,
  Check,
  BarChart3,
  PieChart as PieIcon,
  MapPin,
  Phone,
  LogOut,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Wifi,
  Wrench,
  Trash2,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  Camera,
  UploadCloud,
} from 'lucide-react-native';
import CustomAlertModal, { AlertType } from '../../components/CustomAlertModal';

export type DateFilterType =
  | 'Hari Ini'
  | 'Bulan Ini'
  | 'Bulan Lalu'
  | 'Tahun Ini'
  | 'Tahun Lalu'
  | 'Kustom';

export interface RentInvoice {
  id: string;
  kosId: string;
  roomNumber: string;
  tenantName: string;
  tenantPhone: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'unpaid' | 'overdue' | 'paid';
}

export interface ExpenseInvoice {
  id: string;
  kosId: string;
  title: string;
  category: 'Listrik & Air' | 'Internet WiFi' | 'Kebersihan & Sampah' | 'Perbaikan' | 'Lainnya';
  amount: number;
  dueDate: string;
  status: 'unpaid' | 'paid';
  vendorOrPic: string;
}

export const initialRentInvoices: RentInvoice[] = [
  {
    id: 'inv-1',
    kosId: 'kos-1',
    roomNumber: 'A03',
    tenantName: 'Reza Pratama',
    tenantPhone: '081345678901',
    month: 'Oktober 2026',
    amount: 1200000,
    dueDate: '20 Okt 2026',
    status: 'unpaid',
  },
  {
    id: 'inv-2',
    kosId: 'kos-1',
    roomNumber: 'A04',
    tenantName: 'Dimas Anggara',
    tenantPhone: '081398765432',
    month: 'September 2026',
    amount: 1200000,
    dueDate: '25 Sep 2026',
    status: 'overdue',
  },
  {
    id: 'inv-3',
    kosId: 'kos-1',
    roomNumber: 'A01',
    tenantName: 'Budi Santoso',
    tenantPhone: '081234567890',
    month: 'Oktober 2026',
    amount: 1500000,
    dueDate: '05 Okt 2026',
    status: 'paid',
  },
  {
    id: 'inv-4',
    kosId: 'kos-1',
    roomNumber: 'A02',
    tenantName: 'Siti Rahma',
    tenantPhone: '081298765432',
    month: 'Oktober 2026',
    amount: 1500000,
    dueDate: '12 Okt 2026',
    status: 'paid',
  },
  {
    id: 'inv-5',
    kosId: 'kos-1',
    roomNumber: 'A05',
    tenantName: 'Dr. Hendra',
    tenantPhone: '081122334455',
    month: 'November 2026',
    amount: 2200000,
    dueDate: '15 Nov 2026',
    status: 'paid',
  },
];

export const initialExpenseInvoices: ExpenseInvoice[] = [
  {
    id: 'exp-1',
    kosId: 'kos-1',
    title: 'Token Listrik Pompa & Koridor',
    category: 'Listrik & Air',
    vendorOrPic: 'PLN Prabayar',
    amount: 450000,
    dueDate: '28 Sep 2026',
    status: 'unpaid',
  },
  {
    id: 'exp-2',
    kosId: 'kos-1',
    title: 'Tagihan WiFi Indihome 100Mbps',
    category: 'Internet WiFi',
    vendorOrPic: 'Telkom Indonesia',
    amount: 375000,
    dueDate: '05 Okt 2026',
    status: 'unpaid',
  },
  {
    id: 'exp-3',
    kosId: 'kos-1',
    title: 'Iuran Kebersihan & Keamanan Warga',
    category: 'Kebersihan & Sampah',
    vendorOrPic: 'Pengurus RT 04',
    amount: 150000,
    dueDate: '01 Okt 2026',
    status: 'unpaid',
  },
  {
    id: 'exp-4',
    kosId: 'kos-1',
    title: 'Servis AC Kamar A04 & Filter',
    category: 'Perbaikan',
    vendorOrPic: 'Teknisi AC Sejuk Mandiri',
    amount: 250000,
    dueDate: '24 Sep 2026',
    status: 'paid',
  },
];

export interface TransactionItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  iconBg: string;
  iconColor: string;
}

const mockTransactions: TransactionItem[] = [
  {
    id: 'tx-1',
    title: 'Sewa Kamar A01 - Budi Santoso',
    subtitle: 'Pembayaran Sewa Bulanan (Transfer BCA)',
    category: 'Sewa Bulanan',
    date: 'Hari ini, 14:30 WIB',
    amount: 2200000,
    type: 'income',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
  },
  {
    id: 'tx-2',
    title: 'Sewa Kamar B03 - Siti Rahma',
    subtitle: 'Perpanjangan Sewa 1 Bulan',
    category: 'Sewa Bulanan',
    date: 'Kemarin, 09:15 WIB',
    amount: 1950000,
    type: 'income',
    iconBg: '#DCFCE7',
    iconColor: '#16A34A',
  },
  {
    id: 'tx-3',
    title: 'Servis AC & Perbaikan Kran Air',
    subtitle: 'Kamar A04 & Koridor Lantai 2',
    category: 'Pemeliharaan',
    date: '24 Sep 2026, 11:00 WIB',
    amount: 450000,
    type: 'expense',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
  },
  {
    id: 'tx-4',
    title: 'DP Booking Kamar C02 - Reza P.',
    subtitle: 'Uang Muka Masuk Awal Bulan',
    category: 'Booking DP',
    date: '23 Sep 2026, 16:45 WIB',
    amount: 500000,
    type: 'income',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: 'tx-5',
    title: 'Tagihan WiFi & Token Listrik Bersama',
    subtitle: 'IndiHome 100Mbps + Listrik Pompa',
    category: 'Utilitas',
    date: '20 Sep 2026, 08:30 WIB',
    amount: 620000,
    type: 'expense',
    iconBg: '#EDE9FE',
    iconColor: '#7C3AED',
  },
];

interface DashboardMitraProps {
  onLogout?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export default function DashboardMitra({
  onLogout,
}: DashboardMitraProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomNavMargin = Math.max(insets.bottom, 12) + 6;
  const [selectedFilter, setSelectedFilter] = useState<DateFilterType>('Bulan Ini');
  const [customStartDate, setCustomStartDate] = useState('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState('2026-09-30');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (isFilterModalOpen) {
      slideAnim.setValue(400);
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [isFilterModalOpen]);

  const handleCloseFilterModal = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFilterModalOpen(false);
    });
  };

  const [activeTab, setActiveTab] = useState<'beranda' | 'kamar' | 'tagihan' | 'keuangan' | 'akun'>('beranda');
  const [kosList, setKosList] = useState<KosProperty[]>(defaultKosProperties);
  const [rooms, setRooms] = useState<RoomItem[]>(initialRooms);
  const [selectedKosId, setSelectedKosId] = useState<string>('kos-1');

  // Custom In-App Alert/Modal State
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    type: AlertType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
  });

  const showAlert = (
    title: string,
    message: string,
    type: AlertType = 'info',
    confirmText?: string,
    cancelText?: string,
    onConfirm?: () => void
  ) => {
    setAlertModal({
      visible: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  // Tagihan State & Pagination (Max 10 per halaman)
  const [rentInvoices, setRentInvoices] = useState<RentInvoice[]>(initialRentInvoices);
  const [expenseInvoices, setExpenseInvoices] = useState<ExpenseInvoice[]>(initialExpenseInvoices);
  const [tagihanTab, setTagihanTab] = useState<'sewa' | 'pengeluaran'>('sewa');
  const [filterSewaStatus, setFilterSewaStatus] = useState<'semua' | 'unpaid' | 'overdue' | 'paid'>('semua');
  const [filterExpenseStatus, setFilterExpenseStatus] = useState<'semua' | 'unpaid' | 'paid'>('semua');
  const [currentPageSewa, setCurrentPageSewa] = useState(1);
  const [currentPageExpense, setCurrentPageExpense] = useState(1);
  const ITEMS_PER_PAGE_TAGIHAN = 10;

  const handleFilterSewaChange = (status: 'semua' | 'unpaid' | 'overdue' | 'paid') => {
    setFilterSewaStatus(status);
    setCurrentPageSewa(1);
  };

  const handleFilterExpenseChange = (status: 'semua' | 'unpaid' | 'paid') => {
    setFilterExpenseStatus(status);
    setCurrentPageExpense(1);
  };

  // Tagihan Sewa Modal state
  const [isTagihanModalOpen, setIsTagihanModalOpen] = useState(false);
  const [tagihanRoom, setTagihanRoom] = useState('A01 - Budi Santoso');
  const [tagihanAmount, setTagihanAmount] = useState('1500000');
  const [tagihanMonth, setTagihanMonth] = useState('Oktober 2026');
  const [tagihanDueDate, setTagihanDueDate] = useState('2026-10-05');
  const [sendWaReminder, setSendWaReminder] = useState(true);
  const tagihanSlideAnim = useRef(new Animated.Value(600)).current;

  // Tagihan Pengeluaran Modal state
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<'Listrik & Air' | 'Internet WiFi' | 'Kebersihan & Sampah' | 'Perbaikan' | 'Lainnya'>('Listrik & Air');
  const [newExpenseVendor, setNewExpenseVendor] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('350000');
  const [newExpenseDueDate, setNewExpenseDueDate] = useState('2026-10-01');
  const [newExpenseStatus, setNewExpenseStatus] = useState<'unpaid' | 'paid'>('unpaid');
  const expenseSlideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (isTagihanModalOpen) {
      tagihanSlideAnim.setValue(600);
      Animated.spring(tagihanSlideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [isTagihanModalOpen]);

  const handleCloseTagihanModal = () => {
    Keyboard.dismiss();
    Animated.timing(tagihanSlideAnim, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsTagihanModalOpen(false);
    });
  };

  useEffect(() => {
    if (isExpenseModalOpen) {
      expenseSlideAnim.setValue(600);
      Animated.spring(expenseSlideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [isExpenseModalOpen]);

  const handleCloseExpenseModal = () => {
    Keyboard.dismiss();
    Animated.timing(expenseSlideAnim, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsExpenseModalOpen(false);
    });
  };

  const handleSaveRentInvoice = () => {
    const amountNum = parseInt(tagihanAmount.replace(/\D/g, ''), 10) || 1500000;
    const roomPart = tagihanRoom.split(' - ')[0] || 'A01';
    const tenantPart = tagihanRoom.split(' - ')[1] || 'Penghuni';

    const newInv: RentInvoice = {
      id: `inv-${Date.now()}`,
      kosId: selectedKosId !== 'semua' ? selectedKosId : 'kos-1',
      roomNumber: roomPart,
      tenantName: tenantPart,
      tenantPhone: '081234567890',
      month: tagihanMonth,
      amount: amountNum,
      dueDate: tagihanDueDate,
      status: 'unpaid',
    };

    setRentInvoices([newInv, ...rentInvoices]);
    handleCloseTagihanModal();
    showAlert(
      'Tagihan Sewa Diterbitkan',
      `Tagihan ${tagihanMonth} sebesar Rp ${amountNum.toLocaleString('id-ID')} untuk ${tagihanRoom} berhasil diterbitkan.${sendWaReminder ? '\nNotifikasi invoice telah dikirimkan otomatis ke WhatsApp penghuni.' : ''}`,
      'success'
    );
  };

  const handleSaveExpenseInvoice = () => {
    if (!newExpenseTitle.trim()) {
      showAlert('Form Belum Lengkap', 'Silakan masukkan nama tagihan pengeluaran terlebih dahulu.', 'warning');
      return;
    }
    const amountNum = parseInt(newExpenseAmount.replace(/\D/g, ''), 10) || 100000;

    const newExp: ExpenseInvoice = {
      id: `exp-${Date.now()}`,
      kosId: selectedKosId !== 'semua' ? selectedKosId : 'kos-1',
      title: newExpenseTitle.trim(),
      category: newExpenseCategory,
      vendorOrPic: newExpenseVendor.trim() || 'Pihak Terkait',
      amount: amountNum,
      dueDate: newExpenseDueDate,
      status: newExpenseStatus,
    };

    setExpenseInvoices([newExp, ...expenseInvoices]);
    setNewExpenseTitle('');
    setNewExpenseVendor('');
    handleCloseExpenseModal();
    showAlert(
      'Tagihan Pengeluaran Dicatat',
      `Pengeluaran "${newExp.title}" sebesar Rp ${amountNum.toLocaleString('id-ID')} berhasil dicatat.`,
      'success'
    );
  };

  const handleToggleRentPaid = (invoiceId: string) => {
    const updated = rentInvoices.map((inv) => {
      if (inv.id === invoiceId) {
        const nextStatus = inv.status === 'paid' ? 'unpaid' : 'paid';
        return { ...inv, status: nextStatus as 'unpaid' | 'paid' };
      }
      return inv;
    });
    setRentInvoices(updated);
  };

  const handleToggleExpensePaid = (expenseId: string) => {
    const updated = expenseInvoices.map((exp) => {
      if (exp.id === expenseId) {
        const nextStatus = exp.status === 'paid' ? 'unpaid' : 'paid';
        return { ...exp, status: nextStatus as 'unpaid' | 'paid' };
      }
      return exp;
    });
    setExpenseInvoices(updated);
  };

  // Filtered & Paginated Tagihan Lists
  const filteredRentInvoices = rentInvoices.filter((inv) =>
    filterSewaStatus === 'semua' ? true : inv.status === filterSewaStatus
  );
  const totalRentPages = Math.ceil(filteredRentInvoices.length / ITEMS_PER_PAGE_TAGIHAN) || 1;
  const paginatedRentInvoices = filteredRentInvoices.slice(
    (currentPageSewa - 1) * ITEMS_PER_PAGE_TAGIHAN,
    currentPageSewa * ITEMS_PER_PAGE_TAGIHAN
  );

  const filteredExpenseInvoices = expenseInvoices.filter((exp) =>
    filterExpenseStatus === 'semua' ? true : exp.status === filterExpenseStatus
  );
  const totalExpensePages = Math.ceil(filteredExpenseInvoices.length / ITEMS_PER_PAGE_TAGIHAN) || 1;
  const paginatedExpenseInvoices = filteredExpenseInvoices.slice(
    (currentPageExpense - 1) * ITEMS_PER_PAGE_TAGIHAN,
    currentPageExpense * ITEMS_PER_PAGE_TAGIHAN
  );

  // Dynamic Tagihan statistics
  const unpaidRentList = rentInvoices.filter((i) => i.status === 'unpaid' || i.status === 'overdue');
  const totalUnpaidRent = unpaidRentList.reduce((sum, i) => sum + i.amount, 0);
  const paidRentList = rentInvoices.filter((i) => i.status === 'paid');
  const totalPaidRent = paidRentList.reduce((sum, i) => sum + i.amount, 0);

  const unpaidExpenseList = expenseInvoices.filter((e) => e.status === 'unpaid');
  const totalUnpaidExpense = unpaidExpenseList.reduce((sum, e) => sum + e.amount, 0);
  const paidExpenseList = expenseInvoices.filter((e) => e.status === 'paid');
  const totalPaidExpense = paidExpenseList.reduce((sum, e) => sum + e.amount, 0);

  // Sub-view in Tab Akun: 'profile' (default) | 'tambah_kos' (form lengkap tambah kos & tipe kamar)
  const [akunView, setAkunView] = useState<'profile' | 'tambah_kos'>('profile');

  const allAvailableFacilities = [
    'AC',
    'KM Dalam',
    'KM Luar',
    'WiFi',
    'Water Heater',
    'Smart TV',
    'Kasur Queen',
    'Kasur Single',
    'Lemari Pakaian',
    'Meja Belajar',
    'Balkon',
    'Kulkas Mini',
    'Listrik Gratis',
    'Ventilasi Luar',
  ];

  // Add Kos Form State
  const [newKosName, setNewKosName] = useState('');
  const [newKosAddress, setNewKosAddress] = useState('');
  const [newKosType, setNewKosType] = useState<'Campur' | 'Putra' | 'Putri'>('Campur');
  const [newKosManagerName, setNewKosManagerName] = useState('Bambang Supriyadi');
  const [newKosManagerPhone, setNewKosManagerPhone] = useState('081234567890');
  const [newKosImageUrl, setNewKosImageUrl] = useState<string | null>(null);

  // Dynamic Room Types in Form (Bisa tambah banyak tipe kamar)
  interface FormRoomType {
    id: string;
    name: string;
    price: string;
    size: string;
    totalUnits: string;
    images: string[];
    facilities: string[];
    isExpanded: boolean;
  }

  const [newKosRoomTypes, setNewKosRoomTypes] = useState<FormRoomType[]>([]);

  // Function to pick main building image from phone gallery
  const handlePickBuildingImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        showAlert('Izin Diperlukan', 'Mohon izinkan akses galeri foto pada perangkat Anda.', 'warning');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewKosImageUrl(result.assets[0].uri);
      }
    } catch (error) {
      showAlert('Gagal Membuka Galeri', 'Terjadi kesalahan saat memilih foto.', 'error');
    }
  };

  const handleRemoveBuildingImage = () => {
    setNewKosImageUrl(null);
  };

  const handleAddRoomTypeDraft = () => {
    const newIdx = newKosRoomTypes.length + 1;
    const newTypeDraft: FormRoomType = {
      id: 'rt-draft-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: newIdx === 1 ? 'Tipe Standar' : newIdx === 2 ? 'Tipe Deluxe' : newIdx === 3 ? 'Tipe VIP' : `Tipe Kamar ${newIdx}`,
      price: newIdx === 1 ? '1200000' : newIdx === 2 ? '1600000' : '2200000',
      size: newIdx === 1 ? '3x3 m' : '3.5x4 m',
      totalUnits: '4',
      images: [],
      facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Single', 'Lemari Pakaian'],
      isExpanded: true,
    };
    setNewKosRoomTypes([...newKosRoomTypes, newTypeDraft]);
  };

  const handleToggleExpandRoomType = (id: string) => {
    setNewKosRoomTypes(
      newKosRoomTypes.map((t) => (t.id === id ? { ...t, isExpanded: !t.isExpanded } : t))
    );
  };

  const handleRemoveRoomTypeDraft = (id: string) => {
    setNewKosRoomTypes(newKosRoomTypes.filter((t) => t.id !== id));
  };

  const handleUpdateRoomTypeDraft = (id: string, field: keyof FormRoomType, value: any) => {
    setNewKosRoomTypes(
      newKosRoomTypes.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleToggleRoomTypeFacility = (typeId: string, facility: string) => {
    setNewKosRoomTypes(
      newKosRoomTypes.map((t) => {
        if (t.id !== typeId) return t;
        const exists = t.facilities.includes(facility);
        const newFacilities = exists
          ? t.facilities.filter((f) => f !== facility)
          : [...t.facilities, facility];
        return { ...t, facilities: newFacilities };
      })
    );
  };

  const handlePickRoomTypeImages = async (typeId: string) => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        showAlert('Izin Diperlukan', 'Mohon izinkan akses galeri foto pada perangkat Anda.', 'warning');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.85,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uris = result.assets.map((a) => a.uri);
        setNewKosRoomTypes(
          newKosRoomTypes.map((t) => {
            if (t.id !== typeId) return t;
            return {
              ...t,
              images: [...t.images, ...uris],
            };
          })
        );
      }
    } catch (error) {
      showAlert('Gagal Membuka Galeri', 'Terjadi kesalahan saat memilih foto.', 'error');
    }
  };

  const handleRemoveRoomTypeImage = (typeId: string, imgIndex: number) => {
    setNewKosRoomTypes(
      newKosRoomTypes.map((t) => {
        if (t.id !== typeId) return t;
        const nextImgs = t.images.filter((_, idx) => idx !== imgIndex);
        return { ...t, images: nextImgs };
      })
    );
  };

  const handleSaveFullKos = () => {
    if (!newKosName.trim()) {
      showAlert('Form Belum Lengkap', 'Silakan masukkan nama properti kosan.', 'warning');
      return;
    }
    if (!newKosAddress.trim()) {
      showAlert('Form Belum Lengkap', 'Silakan masukkan alamat lengkap lokasi kosan.', 'warning');
      return;
    }
    if (newKosRoomTypes.length === 0) {
      showAlert('Belum Ada Tipe Kamar', 'Silakan klik tombol "+ Tambah Tipe Kamar" untuk menambahkan minimal 1 tipe kamar.', 'warning');
      return;
    }

    for (let i = 0; i < newKosRoomTypes.length; i++) {
      const rt = newKosRoomTypes[i];
      if (!rt.name.trim()) {
        showAlert('Form Belum Lengkap', `Nama pada Tipe Kamar ke-${i + 1} belum diisi.`, 'warning');
        return;
      }
    }

    const newKosId = `kos-${Date.now()}`;
    const mappedRoomTypes: KosRoomType[] = newKosRoomTypes.map((rt, idx) => ({
      id: `rt-${newKosId}-${idx + 1}`,
      name: rt.name.trim(),
      price: parseInt(rt.price.replace(/\D/g, ''), 10) || 1200000,
      size: rt.size.trim() || '3x4 m',
      totalUnits: parseInt(rt.totalUnits.replace(/\D/g, ''), 10) || 1,
      image: rt.images[0] || undefined,
      images: rt.images,
      facilities: rt.facilities.length > 0 ? rt.facilities : ['Kasur', 'Lemari Pakaian', 'WiFi'],
    }));

    const totalRoomsCount = mappedRoomTypes.reduce((acc, curr) => acc + curr.totalUnits, 0);

    const newKos: KosProperty = {
      id: newKosId,
      name: newKosName.trim(),
      address: newKosAddress.trim(),
      managerName: newKosManagerName.trim() || 'Bambang Supriyadi',
      managerPhone: newKosManagerPhone.trim() || '081234567890',
      totalRooms: totalRoomsCount,
      type: newKosType,
      imageUrl: newKosImageUrl || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
      roomTypes: mappedRoomTypes,
    };

    // Auto generate individual rooms based on room types
    const generatedRooms: RoomItem[] = [];
    let roomCounter = 1;
    mappedRoomTypes.forEach((rt, typeIndex) => {
      const prefix = String.fromCharCode(65 + typeIndex); // 'A', 'B', 'C', ...
      for (let i = 1; i <= rt.totalUnits; i++) {
        const roomNum = `${prefix}${i < 10 ? '0' + i : i}`;
        generatedRooms.push({
          id: `room-${newKosId}-${roomCounter++}`,
          kosId: newKosId,
          roomNumber: roomNum,
          floor: typeIndex + 1,
          type: rt.name,
          price: rt.price,
          status: 'kosong',
          facilities: rt.facilities,
        });
      }
    });

    setKosList([newKos, ...kosList]);
    setRooms([...generatedRooms, ...rooms]);
    setSelectedKosId(newKosId);
    setAkunView('profile');

    // Reset Form
    setNewKosName('');
    setNewKosAddress('');
    setNewKosType('Campur');
    setNewKosImageUrl(null);
    setNewKosRoomTypes([]);

    showAlert(
      'Properti Kos Berhasil Dibuat!',
      `Kosan "${newKos.name}" berhasil ditambahkan dengan ${mappedRoomTypes.length} tipe kamar (${totalRoomsCount} unit kamar otomatis dibuat). Sekarang aktif sebagai properti utama!`,
      'success'
    );
  };

  const [isAddKamarOpen, setIsAddKamarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedBarMonth, setSelectedBarMonth] = useState<string | null>(null);

  // Dynamic values calculated from active Kos and Rooms
  const activeKos = kosList.find((k) => k.id === selectedKosId) || kosList[0];
  const activeRooms = selectedKosId === 'semua' ? rooms : rooms.filter((r) => r.kosId === selectedKosId);
  const totalActiveRooms = activeRooms.length;
  const occupiedActiveRooms = activeRooms.filter((r) => r.status === 'terisi').length;
  const occupancyPercent = totalActiveRooms > 0 ? Math.round((occupiedActiveRooms / totalActiveRooms) * 100) : 0;

  const handleSelectFilter = (filter: DateFilterType) => {
    setSelectedFilter(filter);
    if (filter === 'Hari Ini') {
      setCustomStartDate('2026-09-26');
      setCustomEndDate('2026-09-26');
    } else if (filter === 'Bulan Ini') {
      setCustomStartDate('2026-09-01');
      setCustomEndDate('2026-09-30');
    } else if (filter === 'Bulan Lalu') {
      setCustomStartDate('2026-08-01');
      setCustomEndDate('2026-08-31');
    } else if (filter === 'Tahun Ini') {
      setCustomStartDate('2026-01-01');
      setCustomEndDate('2026-12-31');
    } else if (filter === 'Tahun Lalu') {
      setCustomStartDate('2025-01-01');
      setCustomEndDate('2025-12-31');
    }
  };

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Dynamic values depending on filter
  const getFilterData = () => {
    switch (selectedFilter) {
      case 'Hari Ini':
        return {
          total: 2200000,
          income: 2200000,
          expense: 0,
          periodLabel: 'Hari Ini (26 Sep 2026)',
        };
      case 'Bulan Lalu':
        return {
          total: 23400000,
          income: 24500000,
          expense: 1100000,
          periodLabel: 'Bulan Lalu (Agu 2026)',
        };
      case 'Tahun Ini':
        return {
          total: 284500000,
          income: 298000000,
          expense: 13500000,
          periodLabel: 'Tahun 2026',
        };
      case 'Tahun Lalu':
        return {
          total: 260000000,
          income: 275000000,
          expense: 15000000,
          periodLabel: 'Tahun 2025',
        };
      case 'Kustom':
        return {
          total: 24850000,
          income: 25920000,
          expense: 1070000,
          periodLabel: `${customStartDate} s/d ${customEndDate}`,
        };
      case 'Bulan Ini':
      default:
        return {
          total: 24850000,
          income: 25920000,
          expense: 1070000,
          periodLabel: 'Bulan Ini (Sep 2026)',
        };
    }
  };

  const currentStats = getFilterData();

  const filteredTransactions = mockTransactions.filter((tx) =>
    tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bar Chart Data (6 Months: Mei - Okt)
  const monthlyBarData = [
    { month: 'Mei', income: 21.5, expense: 1.8 },
    { month: 'Jun', income: 23.0, expense: 1.2 },
    { month: 'Jul', income: 22.8, expense: 2.1 },
    { month: 'Agu', income: 24.5, expense: 1.1 },
    { month: 'Sep', income: 25.9, expense: 1.07 },
    { month: 'Okt', income: 26.2, expense: 0.9 },
  ];

  const maxChartValue = 30; // 30 Juta scale
  const chartHeight = 130;

  // Donut Chart Data
  const incomeSources = [
    { label: 'Kamar Tipe Deluxe', percent: 55, amount: 'Rp 14.250.000', color: '#5194EA' },
    { label: 'Kamar Tipe Standar', percent: 30, amount: 'Rp 7.770.000', color: '#60A5FA' },
    { label: 'Fasilitas & Listrik', percent: 10, amount: 'Rp 2.590.000', color: '#F59E0B' },
    { label: 'Booking DP & Denda', percent: 5, amount: 'Rp 1.310.000', color: '#8B5CF6' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} className="flex-1 bg-[#FAFAFA]">
      <StatusBar style="dark" />

      {/* Top Main App Header */}
      <View className="px-6 pt-3 pb-3 flex-row items-center justify-between bg-white border-b border-gray-100">
        {/* Left: User Profile & Greeting */}
        <View className="flex-row items-center gap-3">
          {/* Profile Icon Avatar */}
          <View className="w-12 h-12 rounded-full bg-[#EFF6FF] border-2 border-[#5194EA40] items-center justify-center shadow-xs">
            <User size={24} color="#5194EA" strokeWidth={2.2} />
          </View>
          <View>
            <Text className="text-xs font-medium text-gray-400">
              Selamat datang,
            </Text>
            <Text className="text-base font-extrabold text-gray-900 tracking-tight">
              Mitra Kos Magis
            </Text>
          </View>
        </View>

        {/* Right: Notifications & Settings */}
        <View className="flex-row items-center gap-2">
          {/* Notification Button */}
          <Pressable
            onPress={() =>
              showAlert('Notifikasi', 'Tidak ada notifikasi baru hari ini.', 'info')
            }
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/80 items-center justify-center relative active:bg-gray-100"
          >
            <Bell size={18} color="#374151" strokeWidth={2} />
            <View className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#5194EA] border border-white" />
          </Pressable>

          {/* Filter/Settings Button */}
          <Pressable
            onPress={() => setIsFilterModalOpen(true)}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/80 items-center justify-center active:bg-gray-100"
          >
            <SlidersHorizontal size={18} color="#374151" strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {/* Active Tab Content Switching */}
      {activeTab === 'beranda' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 130 }}
        >
        {/* 1. Main Hero Card (Solid Blue #5194EA Branding Card) */}
        <View
          style={{ backgroundColor: '#5194EA' }}
          className="w-full rounded-3xl p-6 mb-5 shadow-md shadow-[#5194EA30]"
        >
          {/* Top Row: Balance Label with Revenue Icon & Period Pill Switcher */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-xl bg-white/20 items-center justify-center">
                <Coins size={18} color="#FFFFFF" strokeWidth={2.2} />
              </View>
              <Text className="text-xs font-bold text-white uppercase tracking-wider">
                Total Pendapatan Kos
              </Text>
            </View>

            {/* Interactive Period Button (Solid White Pill) */}
            <Pressable
              onPress={() => setIsFilterModalOpen(true)}
              className="bg-white px-3.5 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-xs active:bg-gray-100"
            >
              <Text style={{ color: '#1E40AF' }} className="text-xs font-bold">
                {selectedFilter}
              </Text>
              <ChevronDown size={14} color="#1E40AF" strokeWidth={2.5} />
            </Pressable>
          </View>

          {/* Big Amount Text */}
          <Text className="text-[32px] font-black text-white tracking-tight leading-tight my-2">
            {formatRupiah(currentStats.total)}
          </Text>

          {/* Filter Period Label Subtext */}
          <Text className="text-xs font-medium text-white/90 mb-2">
            Periode: {currentStats.periodLabel}
          </Text>

          {/* Divider Line inside Card */}
          <View className="h-[1px] bg-white/20 my-2.5" />

          {/* Bottom Card Stats: Property & Occupancy */}
          <View className="flex-row items-center justify-between pt-1">
            <View className="flex-1 mr-2">
              <Text className="text-[11px] font-medium text-white/80">
                Properti Utama
              </Text>
              <Text numberOfLines={1} className="text-sm font-bold text-white mt-0.5">
                {activeKos ? `${activeKos.name} • ${totalActiveRooms} Kamar` : 'Semua Kosan'}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[11px] font-medium text-white/80">
                Tingkat Okupansi
              </Text>
              <Text className="text-sm font-bold text-white mt-0.5">
                {occupancyPercent}% ({occupiedActiveRooms}/{totalActiveRooms} Terisi)
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Secondary Analytics Cards (Solid White Cards: Pemasukan & Pengeluaran) */}
        <View className="flex-row gap-3.5 mb-5">
          {/* Income / Pemasukan Card (Solid White Card) */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View
                style={{ backgroundColor: '#5194EA' }}
                className="w-8 h-8 rounded-xl items-center justify-center"
              >
                <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Pemasukan
              </Text>
            </View>
            <Text className="text-base font-black text-[#1D4ED8] tracking-tight">
              +{formatRupiah(currentStats.income)}
            </Text>
            <Text className="text-[10px] font-medium text-gray-400 mt-1">
              11 Pembayaran Sewa
            </Text>
          </View>

          {/* Expenses / Pengeluaran Card (Solid White Card) */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
            <View className="flex-row items-center justify-between mb-2">
              <View
                style={{ backgroundColor: '#EF4444' }}
                className="w-8 h-8 rounded-xl items-center justify-center"
              >
                <ArrowDownLeft size={18} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <Text className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Pengeluaran
              </Text>
            </View>
            <Text className="text-base font-black text-[#DC2626] tracking-tight">
              -{formatRupiah(currentStats.expense)}
            </Text>
            <Text className="text-[10px] font-medium text-gray-400 mt-1">
              Pemeliharaan & Utilitas
            </Text>
          </View>
        </View>

        {/* 3. Bar Chart: Perbandingan Arus Kas (Pemasukan vs Pengeluaran) */}
        <View className="bg-white rounded-3xl p-5 border border-gray-200/70 mb-5 shadow-xs">
          {/* Header & Contained Legend Row */}
          <View className="mb-4">
            <View className="flex-row items-center gap-2 mb-2.5">
              <View className="w-8 h-8 rounded-xl bg-[#EFF6FF] items-center justify-center">
                <BarChart3 size={18} color="#5194EA" strokeWidth={2.2} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-extrabold text-gray-900 tracking-tight">
                  Arus Kas Bulanan
                </Text>
                <Text className="text-[11px] text-gray-400 font-medium">
                  Tren 6 Bulan Terakhir
                </Text>
              </View>
            </View>

            {/* Chart Legend Badges (Solid color badges tanpa dot) */}
            <View className="flex-row items-center gap-2 pt-1">
              <View
                style={{ backgroundColor: '#5194EA' }}
                className="px-3 py-1.5 rounded-lg"
              >
                <Text className="text-[11px] font-bold text-white">
                  Pemasukan (Masuk)
                </Text>
              </View>
              <View
                style={{ backgroundColor: '#EF4444' }}
                className="px-3 py-1.5 rounded-lg"
              >
                <Text className="text-[11px] font-bold text-white">
                  Pengeluaran (Keluar)
                </Text>
              </View>
            </View>
          </View>

          {/* Fully Responsive & Contained Bar Chart Graphic */}
          <View className="pt-3 pb-1">
            {/* Bars Container */}
            <View className="h-32 flex-row justify-between items-end border-b border-gray-200 px-1 pb-1">
              {monthlyBarData.map((item) => {
                const incomePercent = Math.min((item.income / maxChartValue) * 100, 100);
                const expensePercent = Math.max((item.expense / maxChartValue) * 100, 6);
                const isSelected = selectedBarMonth === item.month;

                return (
                  <Pressable
                    key={item.month}
                    onPress={() => {
                      setSelectedBarMonth(item.month);
                      showAlert(
                        `Arus Kas Bulan ${item.month}`,
                        `Pemasukan: Rp ${item.income} Juta\nPengeluaran: Rp ${item.expense} Juta\nKeuntungan Bersih: Rp ${(item.income - item.expense).toFixed(2)} Juta`,
                        'info'
                      );
                    }}
                    className="flex-1 items-center justify-end h-full px-1"
                  >
                    <View className="flex-row items-end gap-1.5 h-full">
                      {/* Income Bar (Solid Blue #5194EA) */}
                      <View
                        style={{
                          height: `${incomePercent}%`,
                          backgroundColor: isSelected ? '#3B82F6' : '#5194EA',
                        }}
                        className="w-3.5 rounded-t-full"
                      />

                      {/* Expense Bar (Solid Red) */}
                      <View
                        style={{
                          height: `${expensePercent}%`,
                          backgroundColor: '#EF4444',
                        }}
                        className="w-3.5 rounded-t-full"
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* X-Axis Month Labels */}
            <View className="flex-row justify-between px-1 pt-2">
              {monthlyBarData.map((item) => (
                <Pressable
                  key={item.month}
                  onPress={() => {
                    setSelectedBarMonth(item.month);
                    showAlert(
                      `Arus Kas Bulan ${item.month}`,
                      `Pemasukan: Rp ${item.income} Juta\nPengeluaran: Rp ${item.expense} Juta\nKeuntungan Bersih: Rp ${(item.income - item.expense).toFixed(2)} Juta`,
                      'info'
                    );
                  }}
                  className="flex-1 items-center"
                >
                  <Text
                    style={{
                      color: selectedBarMonth === item.month ? '#5194EA' : '#6B7280',
                      fontWeight: selectedBarMonth === item.month ? '800' : '600',
                    }}
                    className="text-xs"
                  >
                    {item.month}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* 4. Donut / Pie Chart: Komposisi Sumber Pendapatan */}
        <View className="bg-white rounded-3xl p-5 border border-gray-200/70 mb-5 shadow-xs">
          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-8 h-8 rounded-xl bg-[#FAF5FF] items-center justify-center">
              <PieIcon size={18} color="#7C3AED" strokeWidth={2.2} />
            </View>
            <View>
              <Text className="text-base font-extrabold text-gray-900 tracking-tight">
                Distribusi Pendapatan
              </Text>
              <Text className="text-[11px] text-gray-400 font-medium">
                Komposisi penerimaan sewa & fasilitas
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            {/* SVG Donut Graphic */}
            <View className="w-36 h-36 items-center justify-center relative">
              <Svg width={130} height={130} viewBox="0 0 100 100">
                {/* Segment 1: Deluxe (55%) -> circumference = 2 * PI * 38 = 238.76 */}
                {/* 55% = 131.3 */}
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#5194EA"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray="131.3 238.76"
                  strokeDashoffset="0"
                />
                {/* Segment 2: Standar (30%) = 71.6 */}
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#60A5FA"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray="71.6 238.76"
                  strokeDashoffset="-135"
                />
                {/* Segment 3: Fasilitas (10%) = 23.8 */}
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#F59E0B"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray="23.8 238.76"
                  strokeDashoffset="-210"
                />
                {/* Segment 4: Booking (5%) = 12.0 */}
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#8B5CF6"
                  strokeWidth="15"
                  fill="none"
                  strokeDasharray="12 238.76"
                  strokeDashoffset="-236"
                />
              </Svg>

              {/* Center Overlay Text */}
              <View className="absolute items-center justify-center">
                <Text className="text-xs font-bold text-gray-400">Total</Text>
                <Text className="text-sm font-black text-gray-900">25.9M</Text>
              </View>
            </View>

            {/* Donut Legend Items (Solid without round dots) */}
            <View className="flex-1 ml-4 gap-2">
              {incomeSources.map((item) => (
                <View key={item.label} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1.5 flex-1 mr-2">
                    <View
                      style={{ backgroundColor: item.color }}
                      className="w-3 h-2 rounded-xs"
                    />
                    <Text numberOfLines={1} className="text-xs font-semibold text-gray-700">
                      {item.label}
                    </Text>
                  </View>
                  <Text className="text-xs font-bold text-gray-900">
                    {item.percent}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 6. Recent Transactions Section */}
        <View className="bg-white rounded-3xl p-5 border border-gray-200/70 shadow-xs mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-extrabold text-gray-900 tracking-tight">
                Transaksi Terbaru
              </Text>
              <Text className="text-xs text-gray-400 font-medium">
                Pemasukan & pengeluaran kos
              </Text>
            </View>

            <Pressable
              onPress={() => setShowSearch(!showSearch)}
              className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 items-center justify-center active:bg-gray-100"
            >
              <Search size={16} color="#4B5563" strokeWidth={2.2} />
            </Pressable>
          </View>

          {/* Optional Search Bar */}
          {showSearch && (
            <View className="w-full bg-gray-50 rounded-xl px-3.5 py-2.5 flex-row items-center border border-gray-200 mb-4">
              <Search size={16} color="#9CA3AF" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Cari transaksi atau penyewa..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-xs text-gray-900 ml-2 p-0"
              />
            </View>
          )}

          {/* Transaction List */}
          <View className="gap-3">
            {filteredTransactions.map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <Pressable
                  key={tx.id}
                  onPress={() =>
                    showAlert(
                      tx.title,
                      `Kategori: ${tx.category}\nWaktu: ${tx.date}\nNominal: ${isIncome ? '+' : '-'}${formatRupiah(tx.amount)}\nKeterangan: ${tx.subtitle}`,
                      'info'
                    )
                  }
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#F9FAFB' : '#FFFFFF',
                    },
                  ]}
                  className="p-3.5 rounded-2xl border border-gray-100 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-3 flex-1 mr-2">
                    <View
                      style={{ backgroundColor: tx.iconBg }}
                      className="w-11 h-11 rounded-2xl items-center justify-center"
                    >
                      {isIncome ? (
                        <TrendingUp size={20} color={tx.iconColor} strokeWidth={2.2} />
                      ) : (
                        <TrendingDown size={20} color={tx.iconColor} strokeWidth={2.2} />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text
                        numberOfLines={1}
                        className="text-sm font-bold text-gray-900 tracking-tight"
                      >
                        {tx.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="text-[11px] font-medium text-gray-400 mt-0.5"
                      >
                        {tx.date}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text
                      style={{
                        color: isIncome ? '#16A34A' : '#DC2626',
                      }}
                      className="text-sm font-extrabold tracking-tight"
                    >
                      {isIncome ? '+' : '-'}{formatRupiah(tx.amount)}
                    </Text>
                    <Text className="text-[10px] font-semibold text-gray-400 mt-0.5">
                      {tx.category}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
      )}

      {/* Tab Kamar Content (Halaman Pintu-Pintu Kamar) */}
      {activeTab === 'kamar' && (
        <KamarMitra
          onBackToHome={() => setActiveTab('beranda')}
          openAddModalInitially={isAddKamarOpen}
          kosList={kosList}
          selectedKosId={selectedKosId}
          onSelectKos={(kId) => setSelectedKosId(kId)}
          onNavigateToAkunAddKos={() => {
            setActiveTab('akun');
            setAkunView('tambah_kos');
          }}
          rooms={rooms}
          onUpdateRooms={(newRooms) => setRooms(newRooms)}
        />
      )}
      {activeTab === 'tagihan' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 130 }}
        >
          {/* Header Bar Tagihan */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-xl font-extrabold text-gray-900 tracking-tight">
                Manajemen Tagihan
              </Text>
              <Text className="text-xs text-gray-500 font-medium">
                Penerimaan sewa & pengeluaran operasional
              </Text>
            </View>

            {/* Top Quick Actions */}
            <View className="flex-row items-center gap-1.5">
              <Pressable
                onPress={() => setIsTagihanModalOpen(true)}
                style={{ backgroundColor: '#5194EA' }}
                className="px-3 py-2 rounded-xl flex-row items-center gap-1 active:bg-[#3B82F6] shadow-xs"
              >
                <Plus size={14} color="#FFFFFF" strokeWidth={3} />
                <Text className="text-[11px] font-bold text-white">
                  Tagihan Sewa
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setIsExpenseModalOpen(true)}
                style={{ backgroundColor: '#374151' }}
                className="px-3 py-2 rounded-xl flex-row items-center gap-1 active:bg-gray-800 shadow-xs"
              >
                <Plus size={14} color="#FFFFFF" strokeWidth={3} />
                <Text className="text-[11px] font-bold text-white">
                  Pengeluaran
                </Text>
              </Pressable>
            </View>
          </View>

          {/* 1. Summary Cards Overview */}
          <View className="flex-row gap-2.5 mb-4">
            {/* Piutang Sewa (Belum Bayar) */}
            <View className="flex-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
              <View className="flex-row items-center justify-between mb-1.5">
                <View
                  style={{ backgroundColor: '#F59E0B' }}
                  className="w-7 h-7 rounded-lg items-center justify-center shadow-xs"
                >
                  <Receipt size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <View
                  style={{ backgroundColor: '#F59E0B' }}
                  className="px-2 py-0.5 rounded-md"
                >
                  <Text className="text-[9px] font-bold text-white">
                    {unpaidRentList.length} Kamar
                  </Text>
                </View>
              </View>
              <Text className="text-[10px] font-bold text-gray-500">
                Sewa Belum Bayar
              </Text>
              <Text className="text-xs font-black text-amber-600 mt-0.5">
                {formatRupiah(totalUnpaidRent)}
              </Text>
            </View>

            {/* Tagihan Pengeluaran */}
            <View className="flex-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
              <View className="flex-row items-center justify-between mb-1.5">
                <View
                  style={{ backgroundColor: '#EF4444' }}
                  className="w-7 h-7 rounded-lg items-center justify-center shadow-xs"
                >
                  <ArrowDownLeft size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <View
                  style={{ backgroundColor: '#EF4444' }}
                  className="px-2 py-0.5 rounded-md"
                >
                  <Text className="text-[9px] font-bold text-white">
                    {unpaidExpenseList.length} Item
                  </Text>
                </View>
              </View>
              <Text className="text-[10px] font-bold text-gray-500">
                Pengeluaran Aktif
              </Text>
              <Text className="text-xs font-black text-red-600 mt-0.5">
                {formatRupiah(totalUnpaidExpense)}
              </Text>
            </View>

            {/* Sewa Lunas */}
            <View className="flex-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-xs">
              <View className="flex-row items-center justify-between mb-1.5">
                <View
                  style={{ backgroundColor: '#10B981' }}
                  className="w-7 h-7 rounded-lg items-center justify-center shadow-xs"
                >
                  <CheckCircle2 size={14} color="#FFFFFF" strokeWidth={2.5} />
                </View>
                <View
                  style={{ backgroundColor: '#10B981' }}
                  className="px-2 py-0.5 rounded-md"
                >
                  <Text className="text-[9px] font-bold text-white">
                    {paidRentList.length} Lunas
                  </Text>
                </View>
              </View>
              <Text className="text-[10px] font-bold text-gray-500">
                Sewa Diterima
              </Text>
              <Text className="text-xs font-black text-emerald-700 mt-0.5">
                {formatRupiah(totalPaidRent)}
              </Text>
            </View>
          </View>

          {/* 2. Main Category Segmented Switcher (Sewa Penghuni vs Pengeluaran) */}
          <View className="flex-row bg-white p-1 rounded-2xl border border-gray-200 mb-4 shadow-xs">
            {/* Tab Sewa */}
            <Pressable
              onPress={() => setTagihanTab('sewa')}
              style={{
                backgroundColor: tagihanTab === 'sewa' ? '#5194EA' : 'transparent',
              }}
              className="flex-1 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5"
            >
              <Receipt
                size={15}
                color={tagihanTab === 'sewa' ? '#FFFFFF' : '#4B5563'}
                strokeWidth={2.2}
              />
              <Text
                style={{
                  color: tagihanTab === 'sewa' ? '#FFFFFF' : '#4B5563',
                  fontWeight: tagihanTab === 'sewa' ? '800' : '600',
                }}
                className="text-xs"
              >
                Tagihan Sewa ({rentInvoices.length})
              </Text>
            </Pressable>

            {/* Tab Pengeluaran */}
            <Pressable
              onPress={() => setTagihanTab('pengeluaran')}
              style={{
                backgroundColor: tagihanTab === 'pengeluaran' ? '#5194EA' : 'transparent',
              }}
              className="flex-1 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5"
            >
              <ArrowDownLeft
                size={15}
                color={tagihanTab === 'pengeluaran' ? '#FFFFFF' : '#4B5563'}
                strokeWidth={2.2}
              />
              <Text
                style={{
                  color: tagihanTab === 'pengeluaran' ? '#FFFFFF' : '#4B5563',
                  fontWeight: tagihanTab === 'pengeluaran' ? '800' : '600',
                }}
                className="text-xs"
              >
                Pengeluaran ({expenseInvoices.length})
              </Text>
            </Pressable>
          </View>

          {/* 3. Content: Section Tagihan Sewa Penghuni */}
          {tagihanTab === 'sewa' && (
            <View>
              {/* Status Filter Chips for Sewa */}
              <View className="flex-row gap-1.5 mb-4">
                {[
                  { key: 'semua', label: 'Semua' },
                  { key: 'unpaid', label: 'Belum Bayar' },
                  { key: 'overdue', label: 'Jatuh Tempo' },
                  { key: 'paid', label: 'Lunas' },
                ].map((st) => {
                  const isSelected = filterSewaStatus === st.key;
                  return (
                    <Pressable
                      key={st.key}
                      onPress={() => handleFilterSewaChange(st.key as any)}
                      style={{
                        backgroundColor: isSelected ? '#5194EA' : '#FFFFFF',
                        borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                      }}
                      className="flex-1 py-2 rounded-xl border shadow-xs items-center justify-center active:scale-98"
                    >
                      <Text
                        style={{
                          color: isSelected ? '#FFFFFF' : '#4B5563',
                          fontWeight: isSelected ? '800' : '600',
                        }}
                        className="text-[11px]"
                      >
                        {st.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Rent Invoices List (Paginated - Max 10 per halaman) */}
              <View className="gap-3">
                {filteredRentInvoices.length === 0 ? (
                  <View className="bg-white rounded-2xl p-6 border border-gray-200 items-center justify-center">
                    <DoorClosed size={32} color="#9CA3AF" />
                    <Text className="text-xs font-bold text-gray-700 mt-2">
                      Tidak ada tagihan sewa pada status ini
                    </Text>
                  </View>
                ) : (
                  paginatedRentInvoices.map((inv) => {
                    const isPaid = inv.status === 'paid';
                    const isOverdue = inv.status === 'overdue';
                    const solidStatusColor = isPaid ? '#5194EA' : isOverdue ? '#EF4444' : '#F59E0B';
                    const statusLabel = isPaid ? 'Lunas' : isOverdue ? 'Jatuh Tempo' : 'Belum Bayar';

                    return (
                      <View
                        key={inv.id}
                        className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs"
                      >
                        {/* Card Header: Room Number, Tenant Name & Status Badge */}
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                            <View
                              style={{ backgroundColor: solidStatusColor }}
                              className="w-10 h-10 rounded-xl items-center justify-center shadow-xs"
                            >
                              <DoorClosed size={20} color="#FFFFFF" strokeWidth={2.4} />
                            </View>
                            <View className="flex-1">
                              <Text className="text-sm font-black text-gray-900">
                                Kamar {inv.roomNumber} - {inv.tenantName}
                              </Text>
                              <Text className="text-[10px] text-gray-400 font-medium mt-0.5">
                                Periode: {inv.month} • WA: {inv.tenantPhone}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{ backgroundColor: solidStatusColor }}
                            className="px-2.5 py-1 rounded-full shadow-xs"
                          >
                            <Text className="text-[10px] font-extrabold text-white">
                              {statusLabel}
                            </Text>
                          </View>
                        </View>

                        {/* Amount & Due Date */}
                        <View className="bg-gray-50 p-3 rounded-xl flex-row items-center justify-between my-2">
                          <View>
                            <Text className="text-[10px] text-gray-400 font-medium">
                              Batas Jatuh Tempo:
                            </Text>
                            <Text className="text-xs font-bold text-gray-700 mt-0.5">
                              {inv.dueDate}
                            </Text>
                          </View>
                          <View className="items-end">
                            <Text className="text-[10px] text-gray-400 font-medium">
                              Nominal Tagihan:
                            </Text>
                            <Text className="text-sm font-black text-gray-900 mt-0.5">
                              {formatRupiah(inv.amount)}
                            </Text>
                          </View>
                        </View>

                        {/* Actions Row */}
                        <View className="flex-row gap-2 pt-1 border-t border-gray-100 mt-1">
                          {!isPaid ? (
                            <>
                              <Pressable
                                onPress={() =>
                                  showAlert(
                                    'Pengingat WhatsApp Terkirim',
                                    `Pesan notifikasi tagihan ${inv.month} sebesar ${formatRupiah(inv.amount)} telah dikirimkan ke WhatsApp ${inv.tenantName} (${inv.tenantPhone}).`,
                                    'info'
                                  )
                                }
                                style={{ backgroundColor: '#FFFFFF', borderColor: '#5194EA' }}
                                className="flex-1 h-9 rounded-xl border items-center justify-center flex-row gap-1.5 active:bg-gray-50"
                              >
                                <Phone size={13} color="#5194EA" />
                                <Text className="text-xs font-bold text-[#1D4ED8]">
                                  Ingatkan WA
                                </Text>
                              </Pressable>

                              <Pressable
                                onPress={() => {
                                  handleToggleRentPaid(inv.id);
                                  showAlert(
                                    'Pembayaran Diterima',
                                    `Tagihan kamar ${inv.roomNumber} (${inv.tenantName}) telah berhasil ditandai LUNAS!`,
                                    'success'
                                  );
                                }}
                                style={{ backgroundColor: '#5194EA' }}
                                className="flex-1 h-9 rounded-xl items-center justify-center flex-row gap-1.5 active:bg-[#3B82F6]"
                              >
                                <Check size={14} color="#FFFFFF" strokeWidth={3} />
                                <Text className="text-xs font-bold text-white">
                                  Tandai Lunas
                                </Text>
                              </Pressable>
                            </>
                          ) : (
                            <>
                              <Pressable
                                onPress={() =>
                                  showAlert(
                                    'Kwitansi Pembayaran',
                                    `Invoice LUNAS sewa ${inv.month} Kamar ${inv.roomNumber} (${inv.tenantName}) sebesar ${formatRupiah(inv.amount)} siap diunduh/dibagikan.`,
                                    'info'
                                  )
                                }
                                className="flex-1 h-9 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center flex-row gap-1.5"
                              >
                                <Receipt size={13} color="#4B5563" />
                                <Text className="text-xs font-bold text-gray-700">
                                  Lihat Kwitansi
                                </Text>
                              </Pressable>

                              <Pressable
                                onPress={() => handleToggleRentPaid(inv.id)}
                                className="px-3 h-9 rounded-xl bg-gray-100 items-center justify-center"
                              >
                                <Text className="text-[11px] font-semibold text-gray-600">
                                  Batal Lunas
                                </Text>
                              </Pressable>
                            </>
                          )}
                        </View>
                      </View>
                    );
                  })
                )}
              </View>

              {/* Pagination Controls for Sewa */}
              {totalRentPages > 1 && (
                <View className="flex-row items-center justify-between bg-white p-3 rounded-2xl border border-gray-200 mt-3 shadow-xs">
                  <Pressable
                    disabled={currentPageSewa === 1}
                    onPress={() => setCurrentPageSewa((prev) => Math.max(prev - 1, 1))}
                    style={{
                      backgroundColor: currentPageSewa === 1 ? '#F3F4F6' : '#5194EA',
                    }}
                    className="px-3.5 py-2 rounded-xl flex-row items-center gap-1"
                  >
                    <ChevronLeft
                      size={14}
                      color={currentPageSewa === 1 ? '#9CA3AF' : '#FFFFFF'}
                      strokeWidth={2.5}
                    />
                    <Text
                      style={{
                        color: currentPageSewa === 1 ? '#9CA3AF' : '#FFFFFF',
                      }}
                      className="text-xs font-bold"
                    >
                      Sebelumnya
                    </Text>
                  </Pressable>

                  <Text className="text-xs font-bold text-gray-700">
                    Halaman {currentPageSewa} dari {totalRentPages}
                  </Text>

                  <Pressable
                    disabled={currentPageSewa === totalRentPages}
                    onPress={() => setCurrentPageSewa((prev) => Math.min(prev + 1, totalRentPages))}
                    style={{
                      backgroundColor: currentPageSewa === totalRentPages ? '#F3F4F6' : '#5194EA',
                    }}
                    className="px-3.5 py-2 rounded-xl flex-row items-center gap-1"
                  >
                    <Text
                      style={{
                        color: currentPageSewa === totalRentPages ? '#9CA3AF' : '#FFFFFF',
                      }}
                      className="text-xs font-bold"
                    >
                      Selanjutnya
                    </Text>
                    <ChevronRight
                      size={14}
                      color={currentPageSewa === totalRentPages ? '#9CA3AF' : '#FFFFFF'}
                      strokeWidth={2.5}
                    />
                  </Pressable>
                </View>
              )}
            </View>
          )}

          {/* 4. Content: Section Tagihan Pengeluaran & Utilitas */}
          {tagihanTab === 'pengeluaran' && (
            <View>
              {/* Status Filter Chips for Expense (Singkat 'Semua' agar tidak mepet) */}
              <View className="flex-row gap-2 mb-4">
                {[
                  { key: 'semua', label: 'Semua' },
                  { key: 'unpaid', label: 'Belum Dibayar' },
                  { key: 'paid', label: 'Sudah Dibayar' },
                ].map((st) => {
                  const isSelected = filterExpenseStatus === st.key;
                  return (
                    <Pressable
                      key={st.key}
                      onPress={() => handleFilterExpenseChange(st.key as any)}
                      style={{
                        backgroundColor: isSelected ? '#5194EA' : '#FFFFFF',
                        borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                      }}
                      className="flex-1 py-2 rounded-xl border shadow-xs items-center justify-center active:scale-98"
                    >
                      <Text
                        style={{
                          color: isSelected ? '#FFFFFF' : '#4B5563',
                          fontWeight: isSelected ? '800' : '600',
                        }}
                        className="text-[11px]"
                      >
                        {st.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Expense Invoices List (Paginated - Max 10 per halaman) */}
              <View className="gap-3">
                {filteredExpenseInvoices.length === 0 ? (
                  <View className="bg-white rounded-2xl p-6 border border-gray-200 items-center justify-center">
                    <Receipt size={32} color="#9CA3AF" />
                    <Text className="text-xs font-bold text-gray-700 mt-2">
                      Tidak ada pengeluaran pada status ini
                    </Text>
                  </View>
                ) : (
                  paginatedExpenseInvoices.map((exp) => {
                    const isPaid = exp.status === 'paid';
                    const solidExpenseColor = isPaid ? '#5194EA' : '#EF4444';

                    return (
                      <View
                        key={exp.id}
                        className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs"
                      >
                        {/* Card Header: Category Icon, Title & Status */}
                        <View className="flex-row items-center justify-between mb-2">
                          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                            <View
                              style={{ backgroundColor: solidExpenseColor }}
                              className="w-10 h-10 rounded-xl items-center justify-center shadow-xs"
                            >
                              {exp.category === 'Listrik & Air' ? (
                                <Zap size={18} color="#FFFFFF" strokeWidth={2.4} />
                              ) : exp.category === 'Internet WiFi' ? (
                                <Wifi size={18} color="#FFFFFF" strokeWidth={2.4} />
                              ) : exp.category === 'Perbaikan' ? (
                                <Wrench size={18} color="#FFFFFF" strokeWidth={2.4} />
                              ) : (
                                <Users size={18} color="#FFFFFF" strokeWidth={2.4} />
                              )}
                            </View>
                            <View className="flex-1">
                              <Text className="text-sm font-bold text-gray-900">
                                {exp.title}
                              </Text>
                              <Text className="text-[10px] text-gray-400 font-medium mt-0.5">
                                Kategori: {exp.category} • {exp.vendorOrPic}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{ backgroundColor: solidExpenseColor }}
                            className="px-2.5 py-1 rounded-full shadow-xs"
                          >
                            <Text className="text-[10px] font-extrabold text-white">
                              {isPaid ? 'Sudah Dibayar' : 'Belum Dibayar'}
                            </Text>
                          </View>
                        </View>

                        {/* Amount & Due Date */}
                        <View className="bg-gray-50 p-3 rounded-xl flex-row items-center justify-between my-2">
                          <View>
                            <Text className="text-[10px] text-gray-400 font-medium">
                              Jatuh Tempo:
                            </Text>
                            <Text className="text-xs font-bold text-gray-700 mt-0.5">
                              {exp.dueDate}
                            </Text>
                          </View>
                          <View className="items-end">
                            <Text className="text-[10px] text-gray-400 font-medium">
                              Nominal Biaya:
                            </Text>
                            <Text className="text-sm font-black text-gray-900 mt-0.5">
                              {formatRupiah(exp.amount)}
                            </Text>
                          </View>
                        </View>

                        {/* Action Button */}
                        <View className="pt-1 border-t border-gray-100 mt-1">
                          {!isPaid ? (
                            <Pressable
                              onPress={() => {
                                handleToggleExpensePaid(exp.id);
                                showAlert(
                                  'Tagihan Dibayar',
                                  `Pengeluaran "${exp.title}" sebesar ${formatRupiah(exp.amount)} telah ditandai LUNAS!`,
                                  'success'
                                );
                              }}
                              style={{ backgroundColor: '#5194EA' }}
                              className="w-full h-9 rounded-xl items-center justify-center flex-row gap-1.5 active:bg-[#3B82F6]"
                            >
                              <Check size={14} color="#FFFFFF" strokeWidth={3} />
                              <Text className="text-xs font-bold text-white">
                                Tandai Sudah Dibayar
                              </Text>
                            </Pressable>
                          ) : (
                            <View className="flex-row items-center justify-between">
                              <View className="flex-row items-center gap-1.5">
                                <CheckCircle2 size={14} color="#5194EA" />
                                <Text className="text-xs font-bold text-[#1D4ED8]">
                                  Tercatat Lunas di Laporan Keuangan
                                </Text>
                              </View>
                              <Pressable
                                onPress={() => handleToggleExpensePaid(exp.id)}
                                className="px-2.5 py-1 rounded-lg bg-gray-100"
                              >
                                <Text className="text-[10px] font-semibold text-gray-600">
                                  Batal
                                </Text>
                              </Pressable>
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })
                )}
              </View>

              {/* Pagination Controls for Expense */}
              {totalExpensePages > 1 && (
                <View className="flex-row items-center justify-between bg-white p-3 rounded-2xl border border-gray-200 mt-3 shadow-xs">
                  <Pressable
                    disabled={currentPageExpense === 1}
                    onPress={() => setCurrentPageExpense((prev) => Math.max(prev - 1, 1))}
                    style={{
                      backgroundColor: currentPageExpense === 1 ? '#F3F4F6' : '#5194EA',
                    }}
                    className="px-3.5 py-2 rounded-xl flex-row items-center gap-1"
                  >
                    <ChevronLeft
                      size={14}
                      color={currentPageExpense === 1 ? '#9CA3AF' : '#FFFFFF'}
                      strokeWidth={2.5}
                    />
                    <Text
                      style={{
                        color: currentPageExpense === 1 ? '#9CA3AF' : '#FFFFFF',
                      }}
                      className="text-xs font-bold"
                    >
                      Sebelumnya
                    </Text>
                  </Pressable>

                  <Text className="text-xs font-bold text-gray-700">
                    Halaman {currentPageExpense} dari {totalExpensePages}
                  </Text>

                  <Pressable
                    disabled={currentPageExpense === totalExpensePages}
                    onPress={() => setCurrentPageExpense((prev) => Math.min(prev + 1, totalExpensePages))}
                    style={{
                      backgroundColor: currentPageExpense === totalExpensePages ? '#F3F4F6' : '#5194EA',
                    }}
                    className="px-3.5 py-2 rounded-xl flex-row items-center gap-1"
                  >
                    <Text
                      style={{
                        color: currentPageExpense === totalExpensePages ? '#9CA3AF' : '#FFFFFF',
                      }}
                      className="text-xs font-bold"
                    >
                      Selanjutnya
                    </Text>
                    <ChevronRight
                      size={14}
                      color={currentPageExpense === totalExpensePages ? '#9CA3AF' : '#FFFFFF'}
                      strokeWidth={2.5}
                    />
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}

      {/* Tab Keuangan Content */}
      {activeTab === 'keuangan' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 130 }}
        >
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 mb-5 shadow-xs">
            <Text className="text-lg font-extrabold text-gray-900 mb-1">
              Laporan Keuangan Kos
            </Text>
            <Text className="text-xs text-gray-400 mb-4">
              Rekapitulasi total penerimaan dan biaya operasional kos
            </Text>

            <View className="bg-[#EFF6FF] p-4 rounded-2xl border border-[#5194EA30] mb-4">
              <Text className="text-xs font-semibold text-[#1E40AF]">
                Keuntungan Bersih (Bulan Ini)
              </Text>
              <Text className="text-2xl font-black text-[#1D4ED8] mt-1">
                Rp 24.850.000
              </Text>
            </View>

            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Riwayat Seluruh Transaksi
            </Text>
            <View className="gap-2.5">
              {mockTransactions.map((tx) => (
                <View
                  key={tx.id}
                  className="flex-row items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <View className="flex-1 mr-2">
                    <Text className="text-xs font-bold text-gray-900">{tx.title}</Text>
                    <Text className="text-[10px] text-gray-400">{tx.date}</Text>
                  </View>
                  <Text
                    style={{ color: tx.type === 'income' ? '#5194EA' : '#DC2626' }}
                    className="text-xs font-bold"
                  >
                    {tx.type === 'income' ? '+' : '-'}{formatRupiah(tx.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Tab Akun & Kelola Kosan Content */}
      {activeTab === 'akun' && akunView === 'profile' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 130 }}
        >
          {/* 1. Mitra Profile Info Card */}
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-5">
            <View className="flex-row items-center gap-3.5 mb-2">
              <View
                style={{ backgroundColor: '#5194EA' }}
                className="w-16 h-16 rounded-2xl items-center justify-center shadow-xs"
              >
                <User size={32} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-black text-gray-900">
                  Mitra Kos Magis
                </Text>
                <Text className="text-xs text-gray-500 font-medium">
                  mitra@kosmagis.id • 0812-3456-7890
                </Text>
                <View className="flex-row items-center gap-1.5 mt-2">
                  <View
                    style={{ backgroundColor: '#5194EA' }}
                    className="px-2.5 py-1 rounded-full flex-row items-center gap-1"
                  >
                    <ShieldCheck size={12} color="#FFFFFF" strokeWidth={2.5} />
                    <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Mitra Terverifikasi
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* 2. Section: Kelola Properti Kosan (Geser Horizontal Carousel agar Tidak Numpuk ke Bawah) */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-1 mr-3">
                <Text className="text-base font-extrabold text-gray-900 tracking-tight">
                  Daftar Properti Kosan ({kosList.length})
                </Text>
                <Text numberOfLines={1} className="text-xs text-gray-400 font-medium">
                  Geser ke samping untuk melihat semua properti
                </Text>
              </View>

              <Pressable
                onPress={() => setAkunView('tambah_kos')}
                style={{ backgroundColor: '#5194EA' }}
                className="px-3.5 py-2 rounded-xl flex-row items-center gap-1.5 active:bg-[#3B82F6] shadow-xs"
              >
                <Plus size={14} color="#FFFFFF" strokeWidth={3} />
                <Text className="text-xs font-bold text-white">
                  Tambah Kosan
                </Text>
              </Pressable>
            </View>

            {/* Horizontal Scroll Carousel of Kos Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 14, paddingVertical: 4, paddingRight: 8 }}
              className="flex-row"
            >
              {kosList.map((kos) => {
                const isCurrentActive = selectedKosId === kos.id;
                const kosRooms = rooms.filter((r) => r.kosId === kos.id);
                const totalRoomsCount = kosRooms.length;
                const terisiRoomsCount = kosRooms.filter((r) => r.status === 'terisi').length;
                const kosongRoomsCount = kosRooms.filter((r) => r.status === 'kosong').length;

                return (
                  <View
                    key={kos.id}
                    style={{
                      width: 320,
                      borderColor: isCurrentActive ? '#5194EA' : '#E5E7EB',
                      borderWidth: isCurrentActive ? 2 : 1,
                    }}
                    className="bg-white rounded-3xl border shadow-xs overflow-hidden"
                  >
                    {/* Kos Image Banner (if available) */}
                    {kos.imageUrl && (
                      <View className="relative w-full h-36 bg-gray-100">
                        <Image
                          source={{ uri: kos.imageUrl }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                        {/* Overlay Badges */}
                        <View className="absolute top-3 left-3 flex-row items-center gap-1.5">
                          <View
                            style={{ backgroundColor: '#1E293B' }}
                            className="px-2.5 py-1 rounded-lg"
                          >
                            <Text className="text-[10px] font-bold text-white">
                              Kos {kos.type}
                            </Text>
                          </View>
                          {isCurrentActive && (
                            <View
                              style={{ backgroundColor: '#5194EA' }}
                              className="px-2.5 py-1 rounded-lg shadow-xs"
                            >
                              <Text className="text-[10px] font-bold text-white">
                                Properti Utama
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    )}

                    <View className="p-4">
                      {/* Kos Name & Top Header */}
                      <View className="flex-row items-center justify-between mb-1">
                        <View className="flex-1 mr-2">
                          <Text className="text-base font-extrabold text-gray-900 tracking-tight">
                            {kos.name}
                          </Text>
                        </View>
                        {!kos.imageUrl && (
                          <View
                            style={{ backgroundColor: isCurrentActive ? '#5194EA' : '#F3F4F6' }}
                            className="w-8 h-8 rounded-xl items-center justify-center shadow-xs"
                          >
                            <Building2
                              size={16}
                              color={isCurrentActive ? '#FFFFFF' : '#4B5563'}
                              strokeWidth={2.2}
                            />
                          </View>
                        )}
                      </View>

                      {/* Address with MapPin */}
                      <View className="flex-row items-start gap-1.5 bg-gray-50 p-2.5 rounded-xl my-2">
                        <MapPin size={14} color="#5194EA" className="mt-0.5" />
                        <Text className="text-xs text-gray-600 font-medium flex-1">
                          {kos.address}
                        </Text>
                      </View>

                      {/* Room Types Showcase (Foto & Tipe Kamar) */}
                      {kos.roomTypes && kos.roomTypes.length > 0 && (
                        <View className="my-2.5">
                          <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Tipe Kamar Tersedia ({kos.roomTypes.length} Tipe)
                          </Text>
                          <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8 }}
                          >
                            {kos.roomTypes.map((rt) => (
                              <View
                                key={rt.id}
                                className="bg-gray-50 border border-gray-200/80 rounded-2xl p-2.5 flex-row items-center gap-2.5 min-w-[200px]"
                              >
                                {rt.image ? (
                                  <Image
                                    source={{ uri: rt.image }}
                                    className="w-12 h-12 rounded-xl bg-gray-200"
                                    resizeMode="cover"
                                  />
                                ) : (
                                  <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center">
                                    <DoorClosed size={20} color="#5194EA" />
                                  </View>
                                )}
                                <View className="flex-1">
                                  <Text numberOfLines={1} className="text-xs font-bold text-gray-900">
                                    {rt.name}
                                  </Text>
                                  <Text className="text-[11px] font-extrabold text-[#1D4ED8]">
                                    {formatRupiah(rt.price)}
                                    <Text className="text-[9px] font-normal text-gray-400">/bln</Text>
                                  </Text>
                                  <Text className="text-[10px] text-gray-400 font-medium">
                                    {rt.totalUnits} Kamar • {rt.size}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </ScrollView>
                        </View>
                      )}

                      {/* Manager & Contact */}
                      <View className="flex-row items-center justify-between bg-[#EFF6FF] px-3 py-2 rounded-xl my-2 border border-[#93C5FD]/40">
                        <View className="flex-row items-center gap-1.5 flex-1 mr-2">
                          <User size={13} color="#1D4ED8" />
                          <Text numberOfLines={1} className="text-xs font-bold text-[#1D4ED8]">
                            PJ: {kos.managerName}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() =>
                            showAlert(
                              'Hubungi Pengelola',
                              `Menghubungi ${kos.managerName} via WhatsApp: ${kos.managerPhone}`,
                              'info'
                            )
                          }
                          className="flex-row items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#93C5FD]"
                        >
                          <Phone size={12} color="#1D4ED8" />
                          <Text className="text-[11px] font-bold text-[#1D4ED8]">
                            {kos.managerPhone}
                          </Text>
                        </Pressable>
                      </View>

                      {/* Room Statistics Summary */}
                      <View className="flex-row gap-2 my-2">
                        <View className="flex-1 bg-gray-50 p-2 rounded-xl border border-gray-100 items-center">
                          <Text className="text-sm font-black text-gray-800">{totalRoomsCount}</Text>
                          <Text className="text-[10px] font-semibold text-gray-500">Total Kamar</Text>
                        </View>
                        <View
                          style={{ backgroundColor: '#5194EA' }}
                          className="flex-1 p-2 rounded-xl items-center"
                        >
                          <Text className="text-sm font-black text-white">{terisiRoomsCount}</Text>
                          <Text className="text-[10px] font-semibold text-white">Terisi</Text>
                        </View>
                        <View
                          style={{ backgroundColor: '#EF4444' }}
                          className="flex-1 p-2 rounded-xl items-center"
                        >
                          <Text className="text-sm font-black text-white">{kosongRoomsCount}</Text>
                          <Text className="text-[10px] font-semibold text-white">Kosong</Text>
                        </View>
                      </View>

                      {/* Actions Row inside Kos Card */}
                      <View className="flex-row gap-2 pt-2 border-t border-gray-100 mt-1">
                        <Pressable
                          onPress={() => {
                            setSelectedKosId(kos.id);
                            setActiveTab('kamar');
                          }}
                          style={{ backgroundColor: '#5194EA' }}
                          className="flex-1 h-10 rounded-xl items-center justify-center flex-row gap-1.5 active:bg-[#3B82F6]"
                        >
                          <DoorClosed size={15} color="#FFFFFF" strokeWidth={2.4} />
                          <Text className="text-xs font-bold text-white">
                            Kelola Kamar Kos Ini
                          </Text>
                        </Pressable>

                        {!isCurrentActive && (
                          <Pressable
                            onPress={() => {
                              setSelectedKosId(kos.id);
                              showAlert(
                                'Properti Utama Diubah',
                                `${kos.name} sekarang dipilih sebagai properti utama.`,
                                'success'
                              );
                            }}
                            className="px-3.5 h-10 rounded-xl bg-gray-100 items-center justify-center active:bg-gray-200"
                          >
                            <Text className="text-xs font-bold text-gray-700">
                              Pilih Utama
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* 3. Settings Menu Section */}
          <View className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs mb-5">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
              Pengaturan Akun & Layanan
            </Text>

            <Pressable
              onPress={() =>
                showAlert('Profil Mitra', 'Informasi akun profil dan detail rekening bank penerima.', 'info')
              }
              className="flex-row items-center justify-between p-3 rounded-2xl active:bg-gray-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-gray-100 items-center justify-center">
                  <User size={16} color="#374151" />
                </View>
                <Text className="text-xs font-bold text-gray-800">
                  Edit Profil & Rekening Bank
                </Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </Pressable>

            <Pressable
              onPress={() =>
                showAlert('WhatsApp Gateway', 'Layanan notifikasi otomatis pengingat jatuh tempo sewa kos aktif.', 'info')
              }
              className="flex-row items-center justify-between p-3 rounded-2xl active:bg-gray-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-[#EFF6FF] items-center justify-center">
                  <Phone size={16} color="#5194EA" />
                </View>
                <Text className="text-xs font-bold text-gray-800">
                  Notifikasi Tagihan WhatsApp
                </Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </Pressable>

            <Pressable
              onPress={() =>
                showAlert('Pusat Bantuan', 'Hubungi WhatsApp CS Sistemagis di 0812-9999-0000 untuk bantuan operasional.', 'info')
              }
              className="flex-row items-center justify-between p-3 rounded-2xl active:bg-gray-50"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-xl bg-gray-100 items-center justify-center">
                  <Settings size={16} color="#374151" />
                </View>
                <Text className="text-xs font-bold text-gray-800">
                  Bantuan & Pusat Layanan Mitra
                </Text>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </Pressable>
          </View>

          {/* 4. Logout Action Button */}
          <Pressable
            onPress={() => {
              if (onLogout) {
                showAlert(
                  'Konfirmasi Keluar',
                  'Apakah Anda yakin ingin keluar dari sesi akun Mitra?',
                  'danger',
                  'Keluar',
                  'Batal',
                  onLogout
                );
              }
            }}
            style={{ backgroundColor: '#FEF2F2', borderColor: '#FECDD3' }}
            className="w-full h-12 rounded-2xl border flex-row items-center justify-center gap-2 active:bg-red-100 mb-6"
          >
            <LogOut size={18} color="#DC2626" />
            <Text className="text-sm font-bold text-red-600">
              Keluar dari Akun
            </Text>
          </Pressable>
        </ScrollView>
      )}

      {/* Sub-view: FORM LENGKAP TAMBAH KOSAN & BANYAK TIPE KAMAR */}
      {activeTab === 'akun' && akunView === 'tambah_kos' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 140 }}
        >
          {/* Form Top Navigation Bar */}
          <View className="flex-row items-center justify-between mb-4">
            <Pressable
              onPress={() => setAkunView('profile')}
              className="flex-row items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 active:bg-gray-100 shadow-xs"
            >
              <ArrowLeft size={16} color="#374151" />
              <Text className="text-xs font-bold text-gray-700">
                Kembali ke Akun
              </Text>
            </Pressable>

            <View className="px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
              <Text className="text-[11px] font-bold text-[#1D4ED8]">
                Form Properti Kos
              </Text>
            </View>
          </View>

          {/* Title Header */}
          <View className="mb-5">
            <Text className="text-xl font-black text-gray-900 tracking-tight">
              Tambah Properti & Tipe Kamar
            </Text>
            <Text className="text-xs text-gray-500 font-medium mt-1">
              Lengkapi foto bangunan, info pengelola, dan tipe-tipe kamar kosan Anda langsung dari galeri HP.
            </Text>
          </View>

          {/* CARD 1: Foto Utama Bangunan Kos (Langsung dari Galeri HP) */}
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-5">
            <View className="flex-row items-center gap-2 mb-1.5">
              <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center shadow-xs">
                <Building2 size={16} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <View>
                <Text className="text-sm font-extrabold text-gray-900">
                  1. Foto Bangunan Kos (Tampak Depan)
                </Text>
              </View>
            </View>
            <Text className="text-[11px] text-gray-400 font-medium mb-3.5 ml-10">
              Unggah foto fasad atau gedung tampak depan langsung dari galeri handphone Anda.
            </Text>

            {/* If no photo picked yet */}
            {!newKosImageUrl ? (
              <Pressable
                onPress={handlePickBuildingImage}
                style={{ borderColor: '#5194EA', borderStyle: 'dashed' }}
                className="w-full border-2 rounded-2xl bg-blue-50/40 p-6 items-center justify-center active:bg-blue-100/50"
              >
                <View
                  style={{ backgroundColor: '#5194EA' }}
                  className="w-12 h-12 rounded-2xl items-center justify-center mb-2.5 shadow-xs"
                >
                  <Camera size={22} color="#FFFFFF" strokeWidth={2.3} />
                </View>
                <Text className="text-xs font-bold text-gray-900">
                  Pilih Foto Bangunan dari Galeri HP
                </Text>
                <Text className="text-[10px] text-gray-400 mt-1 text-center">
                  Format JPG, PNG (Maksimal 10MB)
                </Text>
              </Pressable>
            ) : (
              <View>
                <View className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-3 shadow-xs">
                  <Image
                    source={{ uri: newKosImageUrl }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute bottom-2.5 left-2.5 bg-black/70 px-3 py-1 rounded-lg">
                    <Text className="text-[10px] font-bold text-white">
                      Foto Bangunan Terpilih
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Pressable
                    onPress={handlePickBuildingImage}
                    style={{ backgroundColor: '#5194EA' }}
                    className="flex-1 py-2.5 rounded-xl flex-row items-center justify-center gap-1.5 active:bg-[#3B82F6] shadow-xs"
                  >
                    <Camera size={14} color="#FFFFFF" />
                    <Text className="text-xs font-bold text-white">Ganti Foto</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleRemoveBuildingImage}
                    className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 flex-row items-center justify-center gap-1.5 active:bg-red-100"
                  >
                    <Trash2 size={14} color="#DC2626" />
                    <Text className="text-xs font-bold text-red-600">Hapus</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          {/* CARD 2: Informasi Dasar Bangunan */}
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-5">
            <View className="flex-row items-center gap-2 mb-1.5">
              <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center shadow-xs">
                <Building2 size={16} color="#FFFFFF" strokeWidth={2.4} />
              </View>
              <View>
                <Text className="text-sm font-extrabold text-gray-900">
                  2. Informasi Dasar Kosan
                </Text>
              </View>
            </View>
            <Text className="text-[11px] text-gray-400 font-medium mb-3.5 ml-10">
              Nama kosan, alamat lokasi, tipe sewa, dan nomor pengelola
            </Text>

            {/* Nama Kos */}
            <View className="mb-3.5">
              <Text className="text-xs font-bold text-gray-700 mb-1">
                Nama Bangunan Kosan <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={newKosName}
                onChangeText={setNewKosName}
                placeholder="Contoh: Kos Magis Dipatiukur"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
              />
            </View>

            {/* Alamat Lengkap */}
            <View className="mb-3.5">
              <Text className="text-xs font-bold text-gray-700 mb-1">
                Alamat Lengkap Lokasi <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                value={newKosAddress}
                onChangeText={setNewKosAddress}
                placeholder="Contoh: Jl. Dipatiukur No. 88, Lebakgede, Coblong, Bandung"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={2}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-medium"
              />
            </View>

            {/* Tipe Kategori Kos */}
            <View className="mb-3.5">
              <Text className="text-xs font-bold text-gray-700 mb-1.5">
                Tipe Kategori Kos
              </Text>
              <View className="flex-row gap-2">
                {(['Campur', 'Putri', 'Putra'] as ('Campur' | 'Putri' | 'Putra')[]).map((t) => {
                  const isSelected = newKosType === t;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setNewKosType(t)}
                      style={{
                        backgroundColor: isSelected ? '#5194EA' : '#F3F4F6',
                        borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                      }}
                      className="flex-1 py-2.5 rounded-xl border items-center justify-center shadow-xs"
                    >
                      <Text
                        style={{
                          color: isSelected ? '#FFFFFF' : '#374151',
                          fontWeight: isSelected ? '800' : '600',
                        }}
                        className="text-xs"
                      >
                        Kos {t}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* 2-Column: PJ & WA */}
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-700 mb-1">
                  Nama Pengelola <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  value={newKosManagerName}
                  onChangeText={setNewKosManagerName}
                  placeholder="Nama pengelola"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-700 mb-1">
                  WhatsApp Pengelola <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                  value={newKosManagerPhone}
                  onChangeText={setNewKosManagerPhone}
                  keyboardType="phone-pad"
                  placeholder="0812xxxx"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                />
              </View>
            </View>
          </View>

          {/* CARD 3: TIPE-TIPE KAMAR (BISA TAMBAH BANYAK & MULTI-FOTO DARI GALERI) */}
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-5">
            {/* Header: Title & Description */}
            <View className="mb-3.5">
              <View className="flex-row items-center gap-2 mb-1">
                <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center shadow-xs">
                  <DoorClosed size={16} color="#FFFFFF" strokeWidth={2.4} />
                </View>
                <Text className="text-sm font-extrabold text-gray-900">
                  3. Tipe-Tipe Kamar ({newKosRoomTypes.length} Tipe)
                </Text>
              </View>
              <Text className="text-[11px] text-gray-400 font-medium ml-10">
                Atur tipe kamar (seperti Standar, Deluxe, VIP), harga, fasilitas, dan foto interior dari galeri HP.
              </Text>
            </View>

            {/* Empty State: Belum ada tipe kamar */}
            {newKosRoomTypes.length === 0 ? (
              <View className="bg-gray-50 border border-gray-200 rounded-2xl p-5 items-center justify-center my-1">
                <DoorClosed size={34} color="#9CA3AF" />
                <Text className="text-xs font-bold text-gray-800 mt-2">
                  Belum Ada Tipe Kamar
                </Text>
                <Text className="text-[11px] text-gray-400 text-center mt-0.5 mb-3.5 max-w-[280px]">
                  Kosan wajib memiliki minimal 1 tipe kamar. Klik tombol di bawah untuk menambahkan tipe kamar pertama.
                </Text>
                <Pressable
                  onPress={handleAddRoomTypeDraft}
                  style={{ backgroundColor: '#5194EA' }}
                  className="px-4 py-2.5 rounded-xl flex-row items-center gap-1.5 active:bg-[#3B82F6] shadow-xs"
                >
                  <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
                  <Text className="text-xs font-bold text-white">
                    Tambah Tipe Kamar Pertama
                  </Text>
                </Pressable>
              </View>
            ) : (
              /* List of Room Type Accordion Cards */
              <View className="gap-3.5">
                {newKosRoomTypes.map((rt, index) => {
                  const isExpanded = rt.isExpanded !== false;
                  return (
                    <View
                      key={rt.id}
                      className="bg-gray-50/90 border border-gray-200 rounded-2xl p-4 shadow-xs overflow-hidden"
                    >
                      {/* Accordion Top Header */}
                      <View className="flex-row items-center justify-between pb-2.5 border-b border-gray-200">
                        <Pressable
                          onPress={() => handleToggleExpandRoomType(rt.id)}
                          className="flex-row items-center gap-2 flex-1 mr-2 active:opacity-75"
                        >
                          <View
                            style={{ backgroundColor: '#5194EA' }}
                            className="w-6 h-6 rounded-lg items-center justify-center shadow-xs"
                          >
                            <Text className="text-xs font-extrabold text-white">
                              {index + 1}
                            </Text>
                          </View>
                          <View className="flex-1">
                            <Text numberOfLines={1} className="text-xs font-black text-gray-900">
                              {rt.name || `Tipe Kamar ${index + 1}`}
                            </Text>
                            <Text className="text-[10px] text-gray-500 mt-0.5">
                              Rp {parseInt(rt.price || '0', 10).toLocaleString('id-ID')}/bln • {rt.totalUnits || 0} Kamar • {rt.images.length} Foto
                            </Text>
                          </View>
                        </Pressable>

                        <View className="flex-row items-center gap-1.5">
                          <Pressable
                            onPress={() => handleToggleExpandRoomType(rt.id)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 flex-row items-center gap-1 active:bg-gray-100"
                          >
                            <Text className="text-[10px] font-bold text-gray-700">
                              {isExpanded ? 'Tutup' : 'Buka'}
                            </Text>
                            {isExpanded ? (
                              <ChevronUp size={12} color="#4B5563" strokeWidth={2.5} />
                            ) : (
                              <ChevronDown size={12} color="#4B5563" strokeWidth={2.5} />
                            )}
                          </Pressable>

                          <Pressable
                            onPress={() => handleRemoveRoomTypeDraft(rt.id)}
                            className="w-7 h-7 rounded-lg bg-red-100 items-center justify-center active:bg-red-200"
                          >
                            <Trash2 size={13} color="#DC2626" />
                          </Pressable>
                        </View>
                      </View>

                      {/* Expanded Room Type Content */}
                      {isExpanded && (
                        <View className="pt-3.5 gap-3.5">
                          {/* Nama Tipe & Harga */}
                          <View className="flex-row gap-2.5">
                            <View className="flex-1">
                              <Text className="text-[11px] font-bold text-gray-700 mb-1">
                                Nama Tipe Kamar <Text className="text-red-500">*</Text>
                              </Text>
                              <TextInput
                                value={rt.name}
                                onChangeText={(val) => handleUpdateRoomTypeDraft(rt.id, 'name', val)}
                                placeholder="Contoh: Deluxe King"
                                placeholderTextColor="#9CA3AF"
                                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                              />
                            </View>
                            <View className="flex-1">
                              <Text className="text-[11px] font-bold text-gray-700 mb-1">
                                Harga / Bulan (Rp) <Text className="text-red-500">*</Text>
                              </Text>
                              <TextInput
                                value={rt.price}
                                onChangeText={(val) => handleUpdateRoomTypeDraft(rt.id, 'price', val)}
                                keyboardType="numeric"
                                placeholder="1500000"
                                placeholderTextColor="#9CA3AF"
                                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                              />
                            </View>
                          </View>

                          {/* Ukuran & Jumlah Unit */}
                          <View className="flex-row gap-2.5">
                            <View className="flex-1">
                              <Text className="text-[11px] font-bold text-gray-700 mb-1">
                                Ukuran Kamar
                              </Text>
                              <TextInput
                                value={rt.size}
                                onChangeText={(val) => handleUpdateRoomTypeDraft(rt.id, 'size', val)}
                                placeholder="Contoh: 3.5 x 4 m"
                                placeholderTextColor="#9CA3AF"
                                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                              />
                            </View>
                            <View className="flex-1">
                              <Text className="text-[11px] font-bold text-gray-700 mb-1">
                                Jumlah Unit Kamar <Text className="text-red-500">*</Text>
                              </Text>
                              <TextInput
                                value={rt.totalUnits}
                                onChangeText={(val) => handleUpdateRoomTypeDraft(rt.id, 'totalUnits', val)}
                                keyboardType="numeric"
                                placeholder="Contoh: 4"
                                placeholderTextColor="#9CA3AF"
                                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-semibold"
                              />
                            </View>
                          </View>

                          {/* Foto Interior Kamar (Galeri Handphone - Bisa Banyak!) */}
                          <View>
                            <View className="flex-row items-center justify-between mb-2">
                              <View>
                                <Text className="text-[11px] font-bold text-gray-700">
                                  Foto Kamar ({rt.images.length} Foto Terpilih)
                                </Text>
                                <Text className="text-[9px] text-gray-400">
                                  Pilih beberapa foto interior kamar dari galeri HP
                                </Text>
                              </View>

                              <Pressable
                                onPress={() => handlePickRoomTypeImages(rt.id)}
                                style={{ backgroundColor: '#5194EA' }}
                                className="px-3 py-1.5 rounded-lg flex-row items-center gap-1 active:bg-[#3B82F6]"
                              >
                                <Camera size={12} color="#FFFFFF" />
                                <Text className="text-[10px] font-bold text-white">
                                  + Tambah Foto
                                </Text>
                              </Pressable>
                            </View>

                            {/* Foto Preview Horizontal List */}
                            {rt.images.length === 0 ? (
                              <Pressable
                                onPress={() => handlePickRoomTypeImages(rt.id)}
                                style={{ borderColor: '#93C5FD', borderStyle: 'dashed' }}
                                className="border rounded-xl p-3.5 bg-white items-center justify-center active:bg-blue-50/50"
                              >
                                <ImageIcon size={20} color="#9CA3AF" />
                                <Text className="text-[11px] font-bold text-[#1D4ED8] mt-1">
                                  Klik untuk upload foto interior kamar dari galeri
                                </Text>
                                <Text className="text-[9px] text-gray-400 mt-0.5">
                                  Bisa memilih lebih dari 1 foto sekaligus
                                </Text>
                              </Pressable>
                            ) : (
                              <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
                              >
                                {rt.images.map((imgUri, imgIdx) => (
                                  <View
                                    key={imgIdx}
                                    className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-300"
                                  >
                                    <Image
                                      source={{ uri: imgUri }}
                                      className="w-24 h-18 bg-gray-200"
                                      resizeMode="cover"
                                    />
                                    <View className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded">
                                      <Text className="text-[8px] font-bold text-white">
                                        Foto {imgIdx + 1}
                                      </Text>
                                    </View>
                                    <Pressable
                                      onPress={() => handleRemoveRoomTypeImage(rt.id, imgIdx)}
                                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600/90 items-center justify-center active:scale-95"
                                    >
                                      <X size={10} color="#FFFFFF" strokeWidth={3} />
                                    </Pressable>
                                  </View>
                                ))}

                                {/* Extra add button at end of horizontal list */}
                                <Pressable
                                  onPress={() => handlePickRoomTypeImages(rt.id)}
                                  style={{ borderColor: '#93C5FD', borderStyle: 'dashed' }}
                                  className="w-20 h-18 rounded-xl border items-center justify-center bg-white active:bg-blue-50"
                                >
                                  <Plus size={16} color="#5194EA" strokeWidth={2.5} />
                                  <Text className="text-[9px] font-bold text-[#5194EA] mt-0.5">
                                    Tambah
                                  </Text>
                                </Pressable>
                              </ScrollView>
                            )}
                          </View>

                          {/* Fasilitas Kamar Checklist */}
                          <View>
                            <Text className="text-[11px] font-bold text-gray-700 mb-1.5">
                              Fasilitas Tipe Kamar Ini:
                            </Text>
                            <View className="flex-row flex-wrap gap-1.5">
                              {allAvailableFacilities.map((fac) => {
                                const isSelected = rt.facilities.includes(fac);
                                return (
                                  <Pressable
                                    key={fac}
                                    onPress={() => handleToggleRoomTypeFacility(rt.id, fac)}
                                    style={{
                                      backgroundColor: isSelected ? '#5194EA' : '#FFFFFF',
                                      borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg border flex-row items-center gap-1 active:scale-98"
                                  >
                                    {isSelected && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                                    <Text
                                      style={{
                                        color: isSelected ? '#FFFFFF' : '#374151',
                                        fontWeight: isSelected ? '700' : '500',
                                      }}
                                      className="text-[11px]"
                                    >
                                      {fac}
                                    </Text>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </View>

                          {/* Collapse button */}
                          <Pressable
                            onPress={() => handleToggleExpandRoomType(rt.id)}
                            className="py-2 rounded-xl bg-gray-200/80 items-center justify-center active:bg-gray-300 mt-1"
                          >
                            <Text className="text-[11px] font-bold text-gray-700">
                              Selesai Mengatur Tipe Ini
                            </Text>
                          </Pressable>
                        </View>
                      )}
                    </View>
                  );
                })}

                {/* Add More Room Type Button */}
                <Pressable
                  onPress={handleAddRoomTypeDraft}
                  style={{ borderColor: '#5194EA', borderStyle: 'dashed' }}
                  className="mt-2 py-3 rounded-2xl border-2 bg-blue-50/50 flex-row items-center justify-center gap-2 active:bg-blue-100/60"
                >
                  <Plus size={16} color="#1D4ED8" strokeWidth={2.5} />
                  <Text className="text-xs font-bold text-[#1D4ED8]">
                    + Tambah Tipe Kamar Lainnya
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* CARD 4: Ringkasan Total & Submit Button */}
          <View className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs mb-6">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Ringkasan Properti Baru
            </Text>

            <View className="bg-[#EFF6FF] p-3.5 rounded-2xl border border-[#5194EA40] mb-4">
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs font-medium text-gray-700">Nama Kos:</Text>
                <Text className="text-xs font-bold text-gray-900">{newKosName || '-'}</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs font-medium text-gray-700">Jumlah Tipe Kamar:</Text>
                <Text className="text-xs font-bold text-[#1D4ED8]">{newKosRoomTypes.length} Tipe</Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-xs font-medium text-gray-700">Total Unit Kamar:</Text>
                <Text className="text-xs font-extrabold text-[#1D4ED8]">
                  {newKosRoomTypes.reduce((sum, t) => sum + (parseInt(t.totalUnits, 10) || 0), 0)} Kamar (Otomatis Dibuat)
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs font-medium text-gray-700">Foto Bangunan:</Text>
                <Text className="text-xs font-bold text-[#1D4ED8]">
                  {newKosImageUrl ? 'Foto Terpilih' : 'Belum Ada'}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={handleSaveFullKos}
              style={{ backgroundColor: '#5194EA' }}
              className="w-full h-12 rounded-2xl items-center justify-center flex-row gap-2 active:bg-[#3B82F6] shadow-xs mb-2.5"
            >
              <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.5} />
              <Text className="text-base font-bold text-white">
                Simpan & Terbitkan Properti Kos
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setAkunView('profile')}
              className="w-full h-10 rounded-xl items-center justify-center bg-gray-100 active:bg-gray-200"
            >
              <Text className="text-xs font-bold text-gray-600">
                Batal
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {/* 7. Date Range & Quick Action Modal */}
      <Modal
        visible={isFilterModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseFilterModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            {/* Backdrop Dismiss (Static overlay) */}
            <Pressable
              className="flex-1"
              onPress={handleCloseFilterModal}
            />

            {/* Animated Bottom Sheet Content (Slides up from bottom) */}
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl"
            >
              {/* Modal Header */}
              <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <Calendar size={20} color="#5194EA" />
                  <Text className="text-lg font-extrabold text-gray-900">
                    Pilih Rentang Waktu
                  </Text>
                </View>
                <Pressable
                  onPress={handleCloseFilterModal}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </Pressable>
              </View>

              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 8 }}
              >
                {/* Quick Action Chips */}
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-2.5">
                  Pilihan Cepat
                </Text>

                <View className="flex-row flex-wrap gap-2 mb-5">
                  {(['Hari Ini', 'Bulan Ini', 'Bulan Lalu', 'Tahun Ini', 'Tahun Lalu'] as DateFilterType[]).map(
                    (filter) => {
                      const isSelected = selectedFilter === filter;
                      return (
                        <Pressable
                          key={filter}
                          onPress={() => {
                            Keyboard.dismiss();
                            handleSelectFilter(filter);
                          }}
                          style={{
                            backgroundColor: isSelected ? '#5194EA' : '#F3F4F6',
                          }}
                          className="px-4 py-2.5 rounded-xl flex-row items-center gap-1.5"
                        >
                          {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                          <Text
                            style={{
                              color: isSelected ? '#FFFFFF' : '#374151',
                              fontWeight: isSelected ? '700' : '500',
                            }}
                            className="text-xs"
                          >
                            {filter}
                          </Text>
                        </Pressable>
                      );
                    }
                  )}
                </View>

                {/* Custom Range Input */}
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Atau Sesuaikan Tanggal Manual
                </Text>

                <View className="flex-row gap-3 mb-6">
                  <View className="flex-1">
                    <Text className="text-[11px] font-semibold text-gray-500 mb-1">
                      Dari Tanggal
                    </Text>
                    <TextInput
                      value={customStartDate}
                      onChangeText={(val) => {
                        setCustomStartDate(val);
                        setSelectedFilter('Kustom');
                      }}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#9CA3AF"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-medium"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-[11px] font-semibold text-gray-500 mb-1">
                      Sampai Tanggal
                    </Text>
                    <TextInput
                      value={customEndDate}
                      onChangeText={(val) => {
                        setCustomEndDate(val);
                        setSelectedFilter('Kustom');
                      }}
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#9CA3AF"
                      className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 font-medium"
                    />
                  </View>
                </View>

                {/* Apply Button */}
                <Pressable
                  onPress={handleCloseFilterModal}
                  style={{ backgroundColor: '#5194EA' }}
                  className="w-full h-12 rounded-2xl items-center justify-center active:bg-[#3B82F6]"
                >
                  <Text className="text-base font-bold text-white">
                    Terapkan Filter
                  </Text>
                </Pressable>
              </ScrollView>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 8. Catat Tagihan Modal */}
      <Modal
        visible={isTagihanModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          Keyboard.dismiss();
          setIsTagihanModalOpen(false);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <Pressable
              className="flex-1"
              onPress={() => {
                Keyboard.dismiss();
                setIsTagihanModalOpen(false);
              }}
            />

            <View className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[90%]">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center">
                    <Receipt size={18} color="#FFFFFF" strokeWidth={2.4} />
                  </View>
                  <Text className="text-lg font-extrabold text-gray-900">
                    Catat Tagihan Sewa
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                    setIsTagihanModalOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingVertical: 12 }}
              >
                {/* Pilih Kamar & Penghuni */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Pilih Kamar / Penghuni <Text className="text-red-500">*</Text>
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {[
                      'A01 - Budi Santoso',
                      'A02 - Siti Rahma',
                      'A03 - Reza Pratama',
                      'A04 - Dimas Anggara',
                      'B01 - Farhan Malik',
                      'B05 - Kevin Sanjaya',
                    ].map((room) => {
                      const isSelected = tagihanRoom === room;
                      return (
                        <Pressable
                          key={room}
                          onPress={() => setTagihanRoom(room)}
                          style={{
                            backgroundColor: isSelected ? '#5194EA' : '#F3F4F6',
                            borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                          }}
                          className="px-3 py-2 rounded-xl border flex-row items-center gap-1.5"
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          <Text
                            style={{
                              color: isSelected ? '#FFFFFF' : '#374151',
                              fontWeight: isSelected ? '700' : '500',
                            }}
                            className="text-xs"
                          >
                            {room}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Periode Tagihan */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Bulan Periode Sewa
                  </Text>
                  <TextInput
                    value={tagihanMonth}
                    onChangeText={setTagihanMonth}
                    placeholder="Oktober 2026"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Jumlah Tagihan */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Nominal Tagihan (Rp)
                  </Text>
                  <TextInput
                    value={tagihanAmount}
                    onChangeText={setTagihanAmount}
                    keyboardType="numeric"
                    placeholder="1500000"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Jatuh Tempo */}
                <View className="mb-4">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Batas Waktu Pembayaran (Jatuh Tempo)
                  </Text>
                  <TextInput
                    value={tagihanDueDate}
                    onChangeText={setTagihanDueDate}
                    placeholder="2026-10-05"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-medium"
                  />
                </View>

                {/* WhatsApp Reminder Option */}
                <Pressable
                  onPress={() => setSendWaReminder(!sendWaReminder)}
                  className="flex-row items-center gap-2 mb-5 bg-[#EFF6FF] p-3 rounded-xl border border-[#BFDBFE]"
                >
                  <View
                    style={{ backgroundColor: sendWaReminder ? '#5194EA' : '#FFFFFF' }}
                    className="w-5 h-5 rounded-md items-center justify-center border border-[#5194EA]"
                  >
                    {sendWaReminder && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                  <Text className="text-xs font-bold text-[#1E40AF] flex-1">
                    Kirim pesan & invoice otomatis ke WhatsApp penghuni
                  </Text>
                </Pressable>

                {/* Submit Button */}
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                    setIsTagihanModalOpen(false);
                    showAlert(
                      'Tagihan Diterbitkan',
                      `Tagihan ${tagihanMonth} sebesar Rp ${parseInt(tagihanAmount || '0', 10).toLocaleString('id-ID')} untuk ${tagihanRoom} berhasil dibuat!`,
                      'success'
                    );
                  }}
                  style={{ backgroundColor: '#5194EA' }}
                  className="w-full h-12 rounded-2xl items-center justify-center active:bg-[#3B82F6]"
                >
                  <Text className="text-base font-bold text-white">
                    Terbitkan Tagihan
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 10. Catat Tagihan Pengeluaran Modal (Bottom Sheet Slide Up) */}
      <Modal
        visible={isExpenseModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseExpenseModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <Pressable
              className="flex-1"
              onPress={handleCloseExpenseModal}
            />

            <Animated.View
              style={{
                transform: [{ translateY: expenseSlideAnim }],
              }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[90%]"
            >
              {/* Modal Header */}
              <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View style={{ backgroundColor: '#EF4444' }} className="w-8 h-8 rounded-xl items-center justify-center">
                    <ArrowDownLeft size={18} color="#FFFFFF" strokeWidth={2.4} />
                  </View>
                  <Text className="text-lg font-extrabold text-gray-900">
                    Catat Tagihan Pengeluaran
                  </Text>
                </View>
                <Pressable
                  onPress={handleCloseExpenseModal}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingVertical: 12 }}
              >
                {/* Nama Pengeluaran */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Nama Tagihan / Pengeluaran <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    value={newExpenseTitle}
                    onChangeText={setNewExpenseTitle}
                    placeholder="Contoh: Token Listrik Koridor & Pompa"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Kategori Biaya */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Kategori Pengeluaran
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {([
                      'Listrik & Air',
                      'Internet WiFi',
                      'Kebersihan & Sampah',
                      'Perbaikan',
                      'Lainnya',
                    ] as const).map((cat) => {
                      const isSelected = newExpenseCategory === cat;
                      return (
                        <Pressable
                          key={cat}
                          onPress={() => setNewExpenseCategory(cat)}
                          style={{
                            backgroundColor: isSelected ? '#EF4444' : '#F3F4F6',
                            borderColor: isSelected ? '#EF4444' : '#E5E7EB',
                          }}
                          className="px-3 py-2 rounded-xl border flex-row items-center gap-1.5"
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          <Text
                            style={{
                              color: isSelected ? '#FFFFFF' : '#374151',
                              fontWeight: isSelected ? '700' : '500',
                            }}
                            className="text-xs"
                          >
                            {cat}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Vendor / Penerima */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Vendor / Penerima Pembayaran
                  </Text>
                  <TextInput
                    value={newExpenseVendor}
                    onChangeText={setNewExpenseVendor}
                    placeholder="Contoh: PLN Prabayar / Teknisi AC"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-medium"
                  />
                </View>

                {/* Nominal Pengeluaran */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Nominal Biaya (Rp) <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    value={newExpenseAmount}
                    onChangeText={setNewExpenseAmount}
                    keyboardType="numeric"
                    placeholder="350000"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Batas Waktu Bayar */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Batas Waktu Bayar (Jatuh Tempo)
                  </Text>
                  <TextInput
                    value={newExpenseDueDate}
                    onChangeText={setNewExpenseDueDate}
                    placeholder="2026-10-01"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-medium"
                  />
                </View>

                {/* Status Awal (Belum Dibayar / Sudah Lunas) */}
                <View className="mb-5">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Status Pembayaran
                  </Text>
                  <View className="flex-row gap-2">
                    <Pressable
                      onPress={() => setNewExpenseStatus('unpaid')}
                      style={{
                        backgroundColor: newExpenseStatus === 'unpaid' ? '#EF4444' : '#F3F4F6',
                        borderColor: newExpenseStatus === 'unpaid' ? '#EF4444' : '#E5E7EB',
                      }}
                      className="flex-1 py-2.5 rounded-xl border items-center justify-center"
                    >
                      <Text
                        style={{
                          color: newExpenseStatus === 'unpaid' ? '#FFFFFF' : '#374151',
                          fontWeight: newExpenseStatus === 'unpaid' ? '700' : '500',
                        }}
                        className="text-xs"
                      >
                        Belum Dibayar
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setNewExpenseStatus('paid')}
                      style={{
                        backgroundColor: newExpenseStatus === 'paid' ? '#5194EA' : '#F3F4F6',
                        borderColor: newExpenseStatus === 'paid' ? '#5194EA' : '#E5E7EB',
                      }}
                      className="flex-1 py-2.5 rounded-xl border items-center justify-center"
                    >
                      <Text
                        style={{
                          color: newExpenseStatus === 'paid' ? '#FFFFFF' : '#374151',
                          fontWeight: newExpenseStatus === 'paid' ? '700' : '500',
                        }}
                        className="text-xs"
                      >
                        Sudah Dibayar (Lunas)
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={handleSaveExpenseInvoice}
                  style={{ backgroundColor: '#EF4444' }}
                  className="w-full h-12 rounded-2xl items-center justify-center active:bg-red-600"
                >
                  <Text className="text-base font-bold text-white">
                    Simpan Pengeluaran
                  </Text>
                </Pressable>
              </ScrollView>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Floating Bottom Navigation Bar (Warna Putih Bersih dengan Item Aktif & Center Beranda Biru Icon Putih) */}
      <View
        style={{
          position: 'absolute',
          bottom: bottomNavMargin,
          left: width > 560 ? (width - 500) / 2 : 12,
          right: width > 560 ? (width - 500) / 2 : 12,
          maxWidth: 500,
          backgroundColor: '#FFFFFF', // Solid White Background
          borderWidth: 1,
          borderColor: '#E5E7EB',
          borderRadius: 9999,
          paddingHorizontal: 6,
          paddingVertical: 6,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10,
        }}
      >
        {/* Tab 1: Kamar */}
        <FloatingNavItem
          icon={DoorClosed}
          label="Kamar"
          isActive={activeTab === 'kamar'}
          onPress={() => {
            setIsAddKamarOpen(false);
            setActiveTab('kamar');
          }}
        />

        {/* Tab 2: Tagihan */}
        <FloatingNavItem
          icon={Receipt}
          label="Tagihan"
          isActive={activeTab === 'tagihan'}
          onPress={() => setActiveTab('tagihan')}
        />

        {/* Tab Tengah Menonjol: Menu Utama Beranda (Warna Biru dengan Icon Putih) */}
        <ElevatedCenterBerandaButton
          isActive={activeTab === 'beranda'}
          onPress={() => setActiveTab('beranda')}
        />

        {/* Tab 4: Keuangan */}
        <FloatingNavItem
          icon={Wallet}
          label="Keuangan"
          isActive={activeTab === 'keuangan'}
          onPress={() => setActiveTab('keuangan')}
        />

        {/* Tab 5: Akun */}
        <FloatingNavItem
          icon={User}
          label="Akun"
          isActive={activeTab === 'akun'}
          onPress={() => setActiveTab('akun')}
        />
      </View>

      {/* Reusable In-App Custom Alert/Confirmation Popup */}
      <CustomAlertModal
        visible={alertModal.visible}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        confirmText={alertModal.confirmText}
        cancelText={alertModal.cancelText}
        onConfirm={() => {
          if (alertModal.onConfirm) alertModal.onConfirm();
          setAlertModal({ ...alertModal, visible: false });
        }}
        onClose={() => setAlertModal({ ...alertModal, visible: false })}
      />
    </SafeAreaView>
  );
}

// Nav Item Component with Smooth Spring Animation & Solid Active Background
function FloatingNavItem({
  icon: Icon,
  label,
  isActive,
  onPress,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 35,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="items-center flex-1 py-1"
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          backgroundColor: isActive ? '#5194EA' : 'transparent', // Solid Blue Active Capsule with White Icon & Text
          borderRadius: 9999,
          paddingHorizontal: isActive ? 8 : 4,
          paddingVertical: 4,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 44,
          shadowColor: isActive ? '#5194EA' : 'transparent',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isActive ? 0.35 : 0,
          shadowRadius: 4,
          elevation: isActive ? 4 : 0,
        }}
      >
        <Icon
          size={18}
          color={isActive ? '#FFFFFF' : '#9CA3AF'}
          strokeWidth={isActive ? 2.6 : 2}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="clip"
          style={{
            color: isActive ? '#FFFFFF' : '#6B7280',
            fontWeight: isActive ? '800' : '600',
            fontSize: 9,
            marginTop: 1.5,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

// Elevated Center Beranda Button (Menu Utama: Warna Biru dengan Icon Putih)
function ElevatedCenterBerandaButton({
  isActive,
  onPress,
}: {
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.86,
      useNativeDriver: true,
      speed: 35,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 22,
      bounciness: 10,
    }).start();
  };

  return (
    <View className="items-center -mt-7 flex-1">
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="items-center"
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            backgroundColor: '#5194EA', // Solid Vibrant Blue #5194EA
            borderColor: '#FFFFFF', // Solid White Border
            borderWidth: 3.5,
            width: 54,
            height: 54,
            borderRadius: 27,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#5194EA',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <Home size={26} color="#FFFFFF" strokeWidth={2.4} />
        </Animated.View>
        <Text
          style={{
            color: isActive ? '#5194EA' : '#6B7280',
            fontWeight: isActive ? '900' : '700',
            fontSize: 9.5,
            marginTop: 2,
          }}
        >
          Beranda
        </Text>
      </Pressable>
    </View>
  );
}
