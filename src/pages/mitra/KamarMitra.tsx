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
  Image,
} from 'react-native';
import CustomAlertModal from '../../components/CustomAlertModal';
import {
  DoorClosed,
  DoorOpen,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  Check,
  Building2,
  Users,
  Calendar,
  Phone,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Wifi,
  Tv,
  Wind,
  Layers,
  MapPin,
  ImageIcon,
} from 'lucide-react-native';

export type RoomStatus = 'terisi' | 'kosong';

export interface KosRoomType {
  id: string;
  name: string;
  price: number;
  size: string;
  totalUnits: number;
  image?: string;
  facilities: string[];
}

export interface KosProperty {
  id: string;
  name: string;
  address: string;
  managerName: string;
  managerPhone: string;
  totalRooms: number;
  type: string; // 'Campur' | 'Putra' | 'Putri'
  imageUrl?: string;
  roomTypes?: KosRoomType[];
}

export const defaultKosProperties: KosProperty[] = [
  {
    id: 'kos-1',
    name: 'Kos Magis Gatsu',
    address: 'Jl. Gatot Subroto No. 45, Lengkong, Bandung',
    managerName: 'Bambang Supriyadi',
    managerPhone: '081234567890',
    totalRooms: 12,
    type: 'Campur',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
    roomTypes: [
      {
        id: 'rt-1',
        name: 'Deluxe Queen',
        price: 1500000,
        size: '3.5x4 m',
        totalUnits: 8,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80',
        facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen', 'Lemari'],
      },
      {
        id: 'rt-2',
        name: 'VIP Suite',
        price: 2200000,
        size: '4x5 m',
        totalUnits: 4,
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80',
        facilities: ['AC', 'KM Dalam', 'Water Heater', 'Smart TV', 'Balkon', 'WiFi'],
      },
    ],
  },
  {
    id: 'kos-2',
    name: 'Kos Magis Dago',
    address: 'Jl. Ir. H. Juanda No. 112, Dago, Bandung',
    managerName: 'Siti Sarah',
    managerPhone: '081398765432',
    totalRooms: 6,
    type: 'Putri',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
    roomTypes: [
      {
        id: 'rt-3',
        name: 'Standar Single',
        price: 1200000,
        size: '3x3 m',
        totalUnits: 4,
        image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80',
        facilities: ['Kipas Angin', 'KM Dalam', 'WiFi', 'Kasur Single'],
      },
      {
        id: 'rt-4',
        name: 'VIP Studio',
        price: 2200000,
        size: '4x4 m',
        totalUnits: 2,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80',
        facilities: ['AC', 'KM Dalam', 'Water Heater', 'Smart TV', 'Kulkas Mini', 'WiFi'],
      },
    ],
  },
];

export interface RoomItem {
  id: string;
  kosId: string;
  roomNumber: string;
  floor: number;
  type: string;
  price: number;
  status: RoomStatus;
  tenantName?: string;
  tenantPhone?: string;
  dueDate?: string;
  facilities: string[];
  imageUrl?: string;
}

export const initialRooms: RoomItem[] = [
  {
    id: '1',
    kosId: 'kos-1',
    roomNumber: 'A01',
    floor: 1,
    type: 'Deluxe',
    price: 1500000,
    status: 'terisi',
    tenantName: 'Budi Santoso',
    tenantPhone: '081234567890',
    dueDate: '05 Okt 2026',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen', 'Lemari'],
  },
  {
    id: '2',
    kosId: 'kos-1',
    roomNumber: 'A02',
    floor: 1,
    type: 'Deluxe',
    price: 1500000,
    status: 'terisi',
    tenantName: 'Siti Rahma',
    tenantPhone: '081298765432',
    dueDate: '12 Okt 2026',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen', 'Meja Belajar'],
  },
  {
    id: '3',
    kosId: 'kos-1',
    roomNumber: 'A03',
    floor: 1,
    type: 'Standar',
    price: 1200000,
    status: 'terisi',
    tenantName: 'Reza Pratama',
    tenantPhone: '081345678901',
    dueDate: '20 Okt 2026',
    facilities: ['Kipas Angin', 'KM Luar', 'WiFi', 'Kasur Single'],
  },
  {
    id: '4',
    kosId: 'kos-1',
    roomNumber: 'A04',
    floor: 1,
    type: 'Standar',
    price: 1200000,
    status: 'terisi',
    tenantName: 'Dimas Anggara',
    tenantPhone: '081398765432',
    dueDate: '01 Nov 2026',
    facilities: ['Kipas Angin', 'KM Dalam', 'WiFi', 'Kasur Single'],
  },
  {
    id: '5',
    kosId: 'kos-1',
    roomNumber: 'A05',
    floor: 1,
    type: 'VIP',
    price: 2200000,
    status: 'terisi',
    tenantName: 'Dr. Hendra',
    tenantPhone: '081122334455',
    dueDate: '15 Nov 2026',
    facilities: ['AC', 'KM Dalam', 'Water Heater', 'Smart TV', 'Balkon'],
  },
  {
    id: '6',
    kosId: 'kos-1',
    roomNumber: 'A06',
    floor: 1,
    type: 'Deluxe',
    price: 1500000,
    status: 'terisi',
    tenantName: 'Anisa Putri',
    tenantPhone: '081567890123',
    dueDate: '18 Okt 2026',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen'],
  },
  {
    id: '7',
    kosId: 'kos-1',
    roomNumber: 'B01',
    floor: 2,
    type: 'Deluxe',
    price: 1500000,
    status: 'terisi',
    tenantName: 'Farhan Malik',
    tenantPhone: '081678901234',
    dueDate: '25 Okt 2026',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen'],
  },
  {
    id: '8',
    kosId: 'kos-1',
    roomNumber: 'B02',
    floor: 2,
    type: 'Standar',
    price: 1200000,
    status: 'terisi',
    tenantName: 'Rian Wijaya',
    tenantPhone: '081789012345',
    dueDate: '10 Nov 2026',
    facilities: ['AC', 'KM Luar', 'WiFi', 'Kasur Single'],
  },
  {
    id: '9',
    kosId: 'kos-1',
    roomNumber: 'B03',
    floor: 2,
    type: 'Deluxe',
    price: 1500000,
    status: 'terisi',
    tenantName: 'Maya Salsabila',
    tenantPhone: '081890123456',
    dueDate: '28 Okt 2026',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Queen'],
  },
  {
    id: '10',
    kosId: 'kos-1',
    roomNumber: 'B04',
    floor: 2,
    type: 'Standar',
    price: 1200000,
    status: 'kosong',
    facilities: ['AC', 'KM Dalam', 'WiFi', 'Kasur Single', 'Lemari'],
  },
  {
    id: '11',
    kosId: 'kos-2',
    roomNumber: 'D01',
    floor: 1,
    type: 'VIP',
    price: 2200000,
    status: 'terisi',
    tenantName: 'Kevin Sanjaya',
    tenantPhone: '081901234567',
    dueDate: '02 Nov 2026',
    facilities: ['AC', 'KM Dalam', 'Water Heater', 'Smart TV', 'Kulkas Mini'],
  },
  {
    id: '12',
    kosId: 'kos-2',
    roomNumber: 'D02',
    floor: 1,
    type: 'Standar',
    price: 1200000,
    status: 'terisi',
    tenantName: 'Dewi Sartika',
    tenantPhone: '081211223344',
    dueDate: '15 Okt 2026',
    facilities: ['Kipas Angin', 'KM Dalam', 'WiFi', 'Kasur Single'],
  },
];

interface KamarMitraProps {
  onBackToHome?: () => void;
  openAddModalInitially?: boolean;
  kosList?: KosProperty[];
  selectedKosId?: string;
  onSelectKos?: (kosId: string) => void;
  onNavigateToAkunAddKos?: () => void;
  rooms?: RoomItem[];
  onUpdateRooms?: (rooms: RoomItem[]) => void;
}

export default function KamarMitra({
  onBackToHome,
  openAddModalInitially = false,
  kosList = defaultKosProperties,
  selectedKosId = 'kos-1',
  onSelectKos,
  onNavigateToAkunAddKos,
  rooms: controlledRooms,
  onUpdateRooms,
}: KamarMitraProps) {
  const [internalRooms, setInternalRooms] = useState<RoomItem[]>(initialRooms);
  const rooms = controlledRooms !== undefined ? controlledRooms : internalRooms;

  const setRooms = (newRooms: RoomItem[]) => {
    if (onUpdateRooms) {
      onUpdateRooms(newRooms);
    } else {
      setInternalRooms(newRooms);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterKosId, setFilterKosId] = useState<string>(selectedKosId || 'semua');
  const [filterStatus, setFilterStatus] = useState<'semua' | 'terisi' | 'kosong'>('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(openAddModalInitially);
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);
  const [isPropertyDropdownOpen, setIsPropertyDropdownOpen] = useState(false);

  // Edit Status & Tenant Modal State
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<RoomItem | null>(null);
  const [editStatus, setEditStatus] = useState<RoomStatus>('kosong');
  const [editTenantName, setEditTenantName] = useState('');
  const [editTenantPhone, setEditTenantPhone] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const editStatusModalSlideAnim = useRef(new Animated.Value(600)).current;

  // Custom Alert Modal State (Zero native Alert.alert)
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type?: 'success' | 'warning' | 'error' | 'info';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'info',
    confirmText = 'Mengerti',
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

  const handleOpenEditStatus = (room: RoomItem, targetStatus?: RoomStatus) => {
    setEditingRoom(room);
    setEditStatus(targetStatus !== undefined ? targetStatus : room.status);
    setEditTenantName(room.tenantName || '');
    setEditTenantPhone(room.tenantPhone || '');
    setEditDueDate(room.dueDate || '26 Okt 2026');
    setIsEditStatusModalOpen(true);
  };

  useEffect(() => {
    if (isEditStatusModalOpen) {
      editStatusModalSlideAnim.setValue(600);
      Animated.spring(editStatusModalSlideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [isEditStatusModalOpen]);

  const handleCloseEditStatusModal = () => {
    Keyboard.dismiss();
    Animated.timing(editStatusModalSlideAnim, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsEditStatusModalOpen(false);
      setEditingRoom(null);
    });
  };

  const handleSaveEditStatus = () => {
    if (!editingRoom) return;
    if (editStatus === 'terisi' && !editTenantName.trim()) {
      showAlert('Form Belum Lengkap', 'Silakan masukkan nama penghuni untuk kamar yang terisi.', 'warning');
      return;
    }

    const updatedRooms = rooms.map((r) => {
      if (r.id === editingRoom.id) {
        return {
          ...r,
          status: editStatus,
          tenantName: editStatus === 'terisi' ? editTenantName.trim() : undefined,
          tenantPhone: editStatus === 'terisi' ? editTenantPhone.trim() : undefined,
          dueDate: editStatus === 'terisi' ? editDueDate.trim() || '26 Okt 2026' : undefined,
        };
      }
      return r;
    });

    setRooms(updatedRooms);
    if (selectedRoom && selectedRoom.id === editingRoom.id) {
      setSelectedRoom({
        ...selectedRoom,
        status: editStatus,
        tenantName: editStatus === 'terisi' ? editTenantName.trim() : undefined,
        tenantPhone: editStatus === 'terisi' ? editTenantPhone.trim() : undefined,
        dueDate: editStatus === 'terisi' ? editDueDate.trim() || '26 Okt 2026' : undefined,
      });
    }

    handleCloseEditStatusModal();
    showAlert(
      'Status Kamar Diperbarui',
      `Data Kamar ${editingRoom.roomNumber} berhasil disimpan sebagai ${editStatus === 'terisi' ? 'TERISI' : 'KOSONG'}.`,
      'success'
    );
  };

  // Form State for Add Room
  const [addKosId, setAddKosId] = useState(selectedKosId !== 'semua' ? selectedKosId : kosList[0]?.id || 'kos-1');
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newFloor, setNewFloor] = useState('1');
  const [newType, setNewType] = useState('Deluxe');
  const [newPrice, setNewPrice] = useState('1500000');
  const [newStatus, setNewStatus] = useState<RoomStatus>('kosong');
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantPhone, setNewTenantPhone] = useState('');
  const [newFacilities, setNewFacilities] = useState<string[]>([
    'AC',
    'KM Dalam',
    'WiFi',
    'Kasur',
  ]);

  // Spring slide animations for bottom sheets
  const addModalSlideAnim = useRef(new Animated.Value(600)).current;
  const detailModalSlideAnim = useRef(new Animated.Value(600)).current;

  useEffect(() => {
    if (selectedKosId) {
      setFilterKosId(selectedKosId);
      if (selectedKosId !== 'semua') {
        setAddKosId(selectedKosId);
      }
    }
  }, [selectedKosId]);

  useEffect(() => {
    if (openAddModalInitially) {
      setIsAddModalOpen(true);
    }
  }, [openAddModalInitially]);

  useEffect(() => {
    if (isAddModalOpen) {
      addModalSlideAnim.setValue(600);
      Animated.spring(addModalSlideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [isAddModalOpen]);

  const handleCloseAddModal = () => {
    Keyboard.dismiss();
    Animated.timing(addModalSlideAnim, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsAddModalOpen(false);
    });
  };

  useEffect(() => {
    if (selectedRoom !== null) {
      detailModalSlideAnim.setValue(600);
      Animated.spring(detailModalSlideAnim, {
        toValue: 0,
        damping: 24,
        stiffness: 220,
        mass: 0.8,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedRoom]);

  const handleCloseDetailModal = () => {
    Animated.timing(detailModalSlideAnim, {
      toValue: 600,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setSelectedRoom(null);
    });
  };

  const availableFacilities = [
    'AC',
    'Kipas Angin',
    'KM Dalam',
    'KM Luar',
    'WiFi',
    'Kasur',
    'Lemari',
    'Meja Belajar',
    'Water Heater',
    'Smart TV',
    'Balkon',
  ];

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Filtered rooms calculation
  const filteredRooms = rooms.filter((r) => {
    const matchesKos = filterKosId === 'semua' ? true : r.kosId === filterKosId;
    const matchesSearch =
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.tenantName && r.tenantName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      filterStatus === 'semua' ? true : r.status === filterStatus;

    return matchesKos && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterKosChange = (kId: string) => {
    setFilterKosId(kId);
    setCurrentPage(1);
    if (kId !== 'semua' && onSelectKos) {
      onSelectKos(kId);
    }
  };

  const handleFilterStatusChange = (status: 'semua' | 'terisi' | 'kosong') => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const countTotal = filteredRooms.length;
  const countTerisi = filteredRooms.filter((r) => r.status === 'terisi').length;
  const countKosong = filteredRooms.filter((r) => r.status === 'kosong').length;

  const handleToggleFacility = (fac: string) => {
    if (newFacilities.includes(fac)) {
      setNewFacilities(newFacilities.filter((f) => f !== fac));
    } else {
      setNewFacilities([...newFacilities, fac]);
    }
  };

  const handleSaveNewRoom = () => {
    if (!newRoomNumber.trim()) {
      showAlert('Form Belum Lengkap', 'Silakan masukkan nomor kamar (contoh: C01).', 'warning');
      return;
    }

    const priceNum = parseInt(newPrice.replace(/\D/g, ''), 10) || 1200000;
    const floorNum = parseInt(newFloor, 10) || 1;

    const newRoom: RoomItem = {
      id: Date.now().toString(),
      kosId: addKosId,
      roomNumber: newRoomNumber.trim().toUpperCase(),
      floor: floorNum,
      type: newType,
      price: priceNum,
      status: newStatus,
      tenantName: newStatus === 'terisi' && newTenantName.trim() ? newTenantName.trim() : undefined,
      tenantPhone: newStatus === 'terisi' && newTenantPhone.trim() ? newTenantPhone.trim() : undefined,
      dueDate: newStatus === 'terisi' ? '26 Okt 2026' : undefined,
      facilities: newFacilities.length > 0 ? newFacilities : ['Kasur', 'Lemari'],
    };

    setRooms([newRoom, ...rooms]);
    handleCloseAddModal();

    // Reset Form
    setNewRoomNumber('');
    setNewTenantName('');
    setNewTenantPhone('');
    setNewStatus('kosong');
    showAlert('Sukses', `Kamar ${newRoom.roomNumber} berhasil ditambahkan!`, 'success');
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Top Header Bar */}
      <View className="px-5 pt-3 pb-2 flex-row items-center justify-between border-b border-gray-200/60 bg-white">
        <View>
          <Text className="text-xl font-extrabold text-gray-900 tracking-tight">
            Kelola Kamar Kos
          </Text>
          <Text className="text-xs text-gray-500 font-medium">
            Manajemen penghuni
          </Text>
        </View>

        {/* Action Button: Tambah Kamar */}
        <Pressable
          onPress={() => {
            setAddKosId(selectedKosId !== 'semua' ? selectedKosId : kosList[0]?.id || 'kos-1');
            setIsAddModalOpen(true);
          }}
          style={{ backgroundColor: '#5194EA' }}
          className="px-4 py-2 rounded-xl flex-row items-center gap-1.5 active:bg-[#3B82F6] shadow-xs"
        >
          <Plus size={16} color="#FFFFFF" strokeWidth={2.5} />
          <Text className="text-xs font-bold text-white">
            Tambah Kamar
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14, paddingBottom: 120 }}
      >
        {/* 0. Filter Properti Kosan Switcher Bar (Dapat digeser horizontal jika kosan banyak) */}
        <View className="mb-4">
          <View className="flex-row items-center gap-1.5 mb-2.5">
            <Building2 size={16} color="#5194EA" />
            <Text className="text-xs font-bold text-gray-800">
              Pilih Properti Kosan
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              paddingRight: 16,
              paddingVertical: 2,
            }}
          >
            {/* Chip: Semua Kosan */}
            <Pressable
              onPress={() => handleFilterKosChange('semua')}
              style={{
                backgroundColor: filterKosId === 'semua' ? '#5194EA' : '#FFFFFF',
                borderColor: filterKosId === 'semua' ? '#5194EA' : '#E5E7EB',
              }}
              className="px-4 py-2.5 rounded-xl border shadow-xs flex-row items-center gap-2 active:scale-98"
            >
              <Building2 size={14} color={filterKosId === 'semua' ? '#FFFFFF' : '#6B7280'} />
              <Text
                style={{
                  color: filterKosId === 'semua' ? '#FFFFFF' : '#374151',
                  fontWeight: filterKosId === 'semua' ? '800' : '600',
                }}
                className="text-xs"
              >
                Semua Kosan
              </Text>
            </Pressable>

            {/* Chips for each Kos */}
            {kosList.map((k) => {
              const isSelected = filterKosId === k.id;
              return (
                <Pressable
                  key={k.id}
                  onPress={() => handleFilterKosChange(k.id)}
                  style={{
                    backgroundColor: isSelected ? '#5194EA' : '#FFFFFF',
                    borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                  }}
                  className="px-4 py-2.5 rounded-xl border shadow-xs flex-row items-center gap-2 active:scale-98"
                >
                  <Building2 size={14} color={isSelected ? '#FFFFFF' : '#6B7280'} />
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : '#374151',
                      fontWeight: isSelected ? '800' : '600',
                    }}
                    className="text-xs"
                  >
                    {k.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 1. Status Indicator Hero Summary (Solid Primary & Solid Red Card dengan Teks Putih) */}
        <View className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-4">
          <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            Status Ketersediaan Kamar
          </Text>

          <View className="flex-row gap-3">
            {/* Total (Solid White Card dengan Teks Hitam) */}
            <View className="flex-1 bg-white p-3 rounded-xl border border-gray-200 items-center justify-center shadow-xs">
              <Text className="text-2xl font-black text-gray-900">{countTotal}</Text>
              <Text className="text-[11px] font-bold text-gray-700 mt-1">
                Total Kamar
              </Text>
            </View>

            {/* Terisi (Solid Blue Card dengan Teks Putih) */}
            <View
              style={{ backgroundColor: '#5194EA' }}
              className="flex-1 p-3 rounded-xl items-center justify-center shadow-xs"
            >
              <Text className="text-2xl font-black text-white">{countTerisi}</Text>
              <Text className="text-[11px] font-bold text-white mt-1">
                Terisi
              </Text>
            </View>

            {/* Kosong (Solid Red Card dengan Teks Putih) */}
            <View
              style={{ backgroundColor: '#EF4444' }}
              className="flex-1 p-3 rounded-xl items-center justify-center shadow-xs"
            >
              <Text className="text-2xl font-black text-white">{countKosong}</Text>
              <Text className="text-[11px] font-bold text-white mt-1">
                Kosong
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Search & Filter Bar */}
        <View className="mb-4 gap-2.5">
          {/* Search Input */}
          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-xs">
            <Search size={16} color="#9CA3AF" />
            <TextInput
              value={searchQuery}
              onChangeText={handleSearchChange}
              placeholder="Cari nomor kamar, tipe, atau penghuni..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-2 text-xs text-gray-900 font-medium"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => handleSearchChange('')}>
                <X size={16} color="#9CA3AF" />
              </Pressable>
            )}
          </View>

          {/* Filter Status Badges (Solid Color, Tanpa Angka & Tanpa Dot) */}
          <View className="flex-row items-center gap-2">
            {/* Filter: Semua */}
            <Pressable
              onPress={() => handleFilterStatusChange('semua')}
              style={{
                backgroundColor: filterStatus === 'semua' ? '#5194EA' : '#FFFFFF',
                borderColor: filterStatus === 'semua' ? '#5194EA' : '#E5E7EB',
              }}
              className="flex-1 py-2.5 rounded-xl border shadow-xs items-center justify-center active:scale-98"
            >
              <Text
                style={{
                  color: filterStatus === 'semua' ? '#FFFFFF' : '#4B5563',
                  fontWeight: filterStatus === 'semua' ? '800' : '600',
                }}
                className="text-xs"
              >
                Semua
              </Text>
            </Pressable>

            {/* Filter: Terisi (Solid Blue) */}
            <Pressable
              onPress={() => handleFilterStatusChange('terisi')}
              style={{
                backgroundColor: filterStatus === 'terisi' ? '#5194EA' : '#FFFFFF',
                borderColor: filterStatus === 'terisi' ? '#5194EA' : '#E5E7EB',
              }}
              className="flex-1 py-2.5 rounded-xl border shadow-xs items-center justify-center active:scale-98"
            >
              <Text
                style={{
                  color: filterStatus === 'terisi' ? '#FFFFFF' : '#4B5563',
                  fontWeight: filterStatus === 'terisi' ? '800' : '600',
                }}
                className="text-xs"
              >
                Terisi
              </Text>
            </Pressable>

            {/* Filter: Kosong (Solid Red) */}
            <Pressable
              onPress={() => handleFilterStatusChange('kosong')}
              style={{
                backgroundColor: filterStatus === 'kosong' ? '#EF4444' : '#FFFFFF',
                borderColor: filterStatus === 'kosong' ? '#EF4444' : '#E5E7EB',
              }}
              className="flex-1 py-2.5 rounded-xl border shadow-xs items-center justify-center active:scale-98"
            >
              <Text
                style={{
                  color: filterStatus === 'kosong' ? '#FFFFFF' : '#4B5563',
                  fontWeight: filterStatus === 'kosong' ? '800' : '600',
                }}
                className="text-xs"
              >
                Kosong
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 3. Door Grid Layout (Pintu-Pintu Kamar dengan Solid Green & Red) */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Daftar Pintu Kamar ({filteredRooms.length})
            </Text>
          </View>

          {filteredRooms.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 border border-gray-200/80 items-center justify-center my-4">
              <DoorClosed size={40} color="#D1D5DB" />
              <Text className="text-sm font-bold text-gray-700 mt-2">
                Tidak ada kamar yang sesuai
              </Text>
              <Text className="text-xs text-gray-400 text-center mt-1">
                Coba ubah kata kunci pencarian atau filter status kamar.
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between gap-y-3.5">
              {paginatedRooms.map((room) => {
                const isTerisi = room.status === 'terisi';
                const solidAccentColor = isTerisi ? '#5194EA' : '#EF4444';
                const solidDarkText = isTerisi ? '#1D4ED8' : '#DC2626';
                const solidLightBg = isTerisi ? '#EFF6FF' : '#FEF2F2';
                const solidBorderColor = isTerisi ? '#93C5FD' : '#FECDD3';
                const parentKos = kosList.find((k) => k.id === room.kosId);

                return (
                  <Pressable
                    key={room.id}
                    onPress={() => setSelectedRoom(room)}
                    style={{
                      width: '48.5%',
                      borderColor: solidBorderColor,
                    }}
                    className="bg-white rounded-2xl p-3.5 border shadow-xs active:scale-[0.98]"
                  >
                    {/* Top Header of Room Card: Door Icon & Room Number */}
                    <View className="flex-row items-center justify-between mb-2">
                      {/* Door Icon Badge (Solid Color) */}
                      <View
                        style={{ backgroundColor: solidAccentColor }}
                        className="w-10 h-10 rounded-xl items-center justify-center shadow-xs"
                      >
                        {isTerisi ? (
                          <DoorClosed size={22} color="#FFFFFF" strokeWidth={2.3} />
                        ) : (
                          <DoorOpen size={22} color="#FFFFFF" strokeWidth={2.3} />
                        )}
                      </View>

                      {/* Status Badge (Solid Color) */}
                      <View
                        style={{ backgroundColor: solidAccentColor }}
                        className="px-2.5 py-1 rounded-full"
                      >
                        <Text className="text-[10px] font-extrabold text-white tracking-wide uppercase">
                          {isTerisi ? 'Terisi' : 'Kosong'}
                        </Text>
                      </View>
                    </View>

                    {/* Room Identifier */}
                    <View className="my-1">
                      <Text className="text-base font-black text-gray-900 tracking-tight">
                        Kamar {room.roomNumber}
                      </Text>
                      <Text className="text-[11px] font-semibold text-gray-400">
                        Tipe {room.type}
                      </Text>
                      {parentKos && (
                        <Text numberOfLines={1} className="text-[10px] font-medium text-[#5194EA] mt-0.5">
                          {parentKos.name}
                        </Text>
                      )}
                    </View>

                    {/* Tenant or Vacant Info (Tanpa Icon / Emoji) */}
                    <View
                      style={{ backgroundColor: solidLightBg }}
                      className="p-2 rounded-xl my-1.5"
                    >
                      {isTerisi ? (
                        <View>
                          <Text
                            numberOfLines={1}
                            style={{ color: solidDarkText }}
                            className="text-xs font-bold"
                          >
                            {room.tenantName}
                          </Text>
                          <Text className="text-[10px] font-medium text-gray-500 mt-0.5">
                            Tempo: {room.dueDate}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{ color: solidDarkText }}
                            className="text-xs font-bold"
                          >
                            Siap Ditempati
                          </Text>
                          <Text className="text-[10px] font-medium text-gray-500 mt-0.5">
                            Kamar belum berpenghuni
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Price & Action */}
                    <View className="flex-row items-center justify-between pt-1 border-t border-gray-100 mt-1">
                      <Text className="text-xs font-bold text-gray-900">
                        {formatRupiah(room.price)}
                        <Text className="text-[10px] font-normal text-gray-400">/bln</Text>
                      </Text>
                      <ChevronRight size={14} color="#9CA3AF" />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Pagination Controls (Max 10 Kamar per Halaman) */}
          {filteredRooms.length > 0 && totalPages > 1 && (
            <View className="bg-white rounded-2xl p-3.5 border border-gray-200/80 mt-4 flex-row items-center justify-between shadow-xs">
              <View>
                <Text className="text-xs font-bold text-gray-800">
                  Halaman {currentPage} dari {totalPages}
                </Text>
                <Text className="text-[10px] text-gray-400 font-medium mt-0.5">
                  Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredRooms.length)} dari {filteredRooms.length} kamar
                </Text>
              </View>

              <View className="flex-row items-center gap-1.5">
                {/* Prev Button */}
                <Pressable
                  disabled={currentPage === 1}
                  onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    backgroundColor: currentPage === 1 ? '#F3F4F6' : '#5194EA',
                  }}
                  className="w-8 h-8 rounded-xl items-center justify-center active:bg-[#3B82F6]"
                >
                  <ChevronLeft
                    size={16}
                    color={currentPage === 1 ? '#9CA3AF' : '#FFFFFF'}
                    strokeWidth={2.5}
                  />
                </Pressable>

                {/* Page Number Badges */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === currentPage;
                  return (
                    <Pressable
                      key={pageNum}
                      onPress={() => setCurrentPage(pageNum)}
                      style={{
                        backgroundColor: isCurrent ? '#5194EA' : '#FFFFFF',
                        borderColor: isCurrent ? '#5194EA' : '#E5E7EB',
                      }}
                      className="w-8 h-8 rounded-xl border items-center justify-center active:scale-95"
                    >
                      <Text
                        style={{
                          color: isCurrent ? '#FFFFFF' : '#374151',
                          fontWeight: isCurrent ? '800' : '600',
                        }}
                        className="text-xs"
                      >
                        {pageNum}
                      </Text>
                    </Pressable>
                  );
                })}

                {/* Next Button */}
                <Pressable
                  disabled={currentPage === totalPages}
                  onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    backgroundColor: currentPage === totalPages ? '#F3F4F6' : '#5194EA',
                  }}
                  className="w-8 h-8 rounded-xl items-center justify-center active:bg-[#3B82F6]"
                >
                  <ChevronRight
                    size={16}
                    color={currentPage === totalPages ? '#9CA3AF' : '#FFFFFF'}
                    strokeWidth={2.5}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 4. Room Detail Modal (Slides Up from Bottom) */}
      <Modal
        visible={selectedRoom !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseDetailModal}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <Pressable
            className="flex-1"
            onPress={handleCloseDetailModal}
          />

          {selectedRoom && (
            <Animated.View
              style={{
                transform: [{ translateY: detailModalSlideAnim }],
              }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl"
            >
              {/* Header */}
              <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
                <View className="flex-row items-center gap-3">
                  <View
                    style={{
                      backgroundColor: selectedRoom.status === 'terisi' ? '#5194EA' : '#EF4444',
                    }}
                    className="w-12 h-12 rounded-2xl items-center justify-center shadow-xs"
                  >
                    {selectedRoom.status === 'terisi' ? (
                      <DoorClosed size={26} color="#FFFFFF" strokeWidth={2.3} />
                    ) : (
                      <DoorOpen size={26} color="#FFFFFF" strokeWidth={2.3} />
                    )}
                  </View>
                  <View>
                    <Text className="text-lg font-extrabold text-gray-900">
                      Kamar {selectedRoom.roomNumber}
                    </Text>
                    <Text className="text-xs font-medium text-gray-500">
                      Tipe {selectedRoom.type}
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={handleCloseDetailModal}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </Pressable>
              </View>

              {/* Status Banner */}
              <View
                style={{
                  backgroundColor:
                    selectedRoom.status === 'terisi' ? '#EFF6FF' : '#FEF2F2',
                  borderColor:
                    selectedRoom.status === 'terisi' ? '#93C5FD' : '#FECDD3',
                }}
                className="p-3.5 rounded-2xl border my-4 flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-2">
                  <Text
                    style={{
                      color:
                        selectedRoom.status === 'terisi' ? '#1D4ED8' : '#DC2626',
                    }}
                    className="text-sm font-bold"
                  >
                    Status: {selectedRoom.status === 'terisi' ? 'Terisi' : 'Kosong'}
                  </Text>
                </View>
                <Text className="text-xs font-bold text-gray-900">
                  {formatRupiah(selectedRoom.price)}/bln
                </Text>
              </View>

              {/* Tenant Detail (if terisi) */}
              {selectedRoom.status === 'terisi' ? (
                <View className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-4">
                  <Text className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Informasi Penghuni Aktif
                  </Text>
                  <View className="flex-row items-center justify-between mb-1.5">
                    <Text className="text-xs text-gray-500">Nama Penghuni:</Text>
                    <Text className="text-xs font-bold text-gray-900">
                      {selectedRoom.tenantName}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between mb-1.5">
                    <Text className="text-xs text-gray-500">Nomor Kontak:</Text>
                    <Text className="text-xs font-bold text-gray-900">
                      {selectedRoom.tenantPhone || '-'}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-gray-500">Jatuh Tempo Sewa:</Text>
                    <Text className="text-xs font-bold text-[#1D4ED8]">
                      {selectedRoom.dueDate}
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-4 items-center">
                  <Text className="text-xs font-bold text-gray-800">
                    Kamar ini sedang kosong
                  </Text>
                  <Text className="text-[11px] text-gray-500 text-center mt-1">
                    Anda dapat mencatat penghuni baru yang memesan kamar ini.
                  </Text>
                </View>
              )}

              {/* Facilities */}
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Fasilitas Kamar
              </Text>
              <View className="flex-row flex-wrap gap-1.5 mb-5">
                {selectedRoom.facilities.map((f) => (
                  <View
                    key={f}
                    className="bg-gray-100 px-3 py-1.5 rounded-lg flex-row items-center gap-1"
                  >
                    <Check size={12} color="#5194EA" strokeWidth={3} />
                    <Text className="text-xs font-semibold text-gray-700">{f}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                {selectedRoom.status === 'terisi' ? (
                  <Pressable
                    onPress={() => {
                      showAlert(
                        'Hubungi Penghuni',
                        `Membuka pesan WhatsApp ke ${selectedRoom.tenantPhone || 'nomor penghuni'} (${selectedRoom.tenantName || 'Penghuni'})...`,
                        'info'
                      );
                    }}
                    style={{ backgroundColor: '#5194EA' }}
                    className="flex-1 h-12 rounded-2xl items-center justify-center flex-row gap-2 active:bg-[#3B82F6]"
                  >
                    <Phone size={16} color="#FFFFFF" />
                    <Text className="text-sm font-bold text-white">
                      Hubungi Penghuni
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      handleOpenEditStatus(selectedRoom, 'terisi');
                    }}
                    style={{ backgroundColor: '#5194EA' }}
                    className="flex-1 h-12 rounded-2xl items-center justify-center flex-row gap-2 active:bg-[#3B82F6]"
                  >
                    <CheckCircle2 size={16} color="#FFFFFF" />
                    <Text className="text-sm font-bold text-white">
                      Tandai Terisi
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={() => {
                    handleOpenEditStatus(selectedRoom);
                  }}
                  className="px-4 h-12 rounded-2xl bg-gray-100 items-center justify-center active:bg-gray-200"
                >
                  <Text className="text-xs font-bold text-gray-700">
                    Ubah Status
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          )}
        </View>
      </Modal>

      {/* 5. Tambah Kamar Baru Modal (Slides Up from Bottom with Spring Animation) */}
      <Modal
        visible={isAddModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseAddModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <Pressable
              className="flex-1"
              onPress={handleCloseAddModal}
            />

            <Animated.View
              style={{
                transform: [{ translateY: addModalSlideAnim }],
              }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[90%]"
            >
              {/* Modal Header */}
              <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center">
                    <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
                  </View>
                  <Text className="text-lg font-extrabold text-gray-900">
                    Tambah Kamar Baru
                  </Text>
                </View>
                <Pressable
                  onPress={handleCloseAddModal}
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
                {/* Pilih Properti Kosan (Dropdown / Collapsible Selector yang efisien untuk banyak properti) */}
                <View className="mb-4">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Pilih Properti Kosan <Text className="text-red-500">*</Text>
                  </Text>

                  {/* Selected Kos Card with Dropdown Trigger */}
                  {(() => {
                    const currentSelectedKos =
                      kosList.find((k) => k.id === addKosId) || kosList[0];
                    return (
                      <View className="border border-[#5194EA] rounded-2xl bg-[#EFF6FF] overflow-hidden shadow-xs">
                        <Pressable
                          onPress={() =>
                            setIsPropertyDropdownOpen(!isPropertyDropdownOpen)
                          }
                          className="p-3 flex-row items-center justify-between active:bg-[#DBEAFE]"
                        >
                          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
                            <View
                              style={{ backgroundColor: '#5194EA' }}
                              className="w-9 h-9 rounded-xl items-center justify-center shadow-xs"
                            >
                              <Building2 size={18} color="#FFFFFF" strokeWidth={2.4} />
                            </View>
                            <View className="flex-1">
                              <View className="flex-row items-center gap-1.5">
                                <Text
                                  numberOfLines={1}
                                  className="text-xs font-black text-[#1D4ED8]"
                                >
                                  {currentSelectedKos?.name}
                                </Text>
                                <View className="bg-[#5194EA20] px-1.5 py-0.5 rounded">
                                  <Text className="text-[9px] font-bold text-[#1D4ED8]">
                                    {currentSelectedKos?.type}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                numberOfLines={1}
                                className="text-[10px] text-gray-500 mt-0.5"
                              >
                                {currentSelectedKos?.address}
                              </Text>
                            </View>
                          </View>

                          <View className="flex-row items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#93C5FD]">
                            <Text className="text-[10px] font-bold text-[#1D4ED8]">
                              {isPropertyDropdownOpen ? 'Tutup' : 'Ganti'}
                            </Text>
                            {isPropertyDropdownOpen ? (
                              <ChevronUp size={12} color="#1D4ED8" strokeWidth={2.5} />
                            ) : (
                              <ChevronDown size={12} color="#1D4ED8" strokeWidth={2.5} />
                            )}
                          </View>
                        </Pressable>

                        {/* Dropdown List when expanded (Scrollable & Contained) */}
                        {isPropertyDropdownOpen && (
                          <View className="bg-white border-t border-[#93C5FD]/50 p-2 max-h-48">
                            <ScrollView
                              nestedScrollEnabled={true}
                              showsVerticalScrollIndicator={true}
                              contentContainerStyle={{ gap: 6 }}
                            >
                              {kosList.map((k) => {
                                const isSelected = addKosId === k.id;
                                return (
                                  <Pressable
                                    key={k.id}
                                    onPress={() => {
                                      setAddKosId(k.id);
                                      setIsPropertyDropdownOpen(false);
                                    }}
                                    style={{
                                      backgroundColor: isSelected ? '#EFF6FF' : '#F9FAFB',
                                      borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                                    }}
                                    className="p-2.5 rounded-xl border flex-row items-center justify-between"
                                  >
                                    <View className="flex-row items-center gap-2 flex-1 mr-2">
                                      <Building2
                                        size={15}
                                        color={isSelected ? '#1D4ED8' : '#6B7280'}
                                      />
                                      <View className="flex-1">
                                        <Text
                                          numberOfLines={1}
                                          style={{
                                            color: isSelected ? '#1D4ED8' : '#111827',
                                            fontWeight: isSelected ? '800' : '600',
                                          }}
                                          className="text-xs"
                                        >
                                          {k.name} ({k.type})
                                        </Text>
                                        <Text
                                          numberOfLines={1}
                                          className="text-[10px] text-gray-400"
                                        >
                                          {k.address}
                                        </Text>
                                      </View>
                                    </View>

                                    <View
                                      style={{
                                        backgroundColor: isSelected ? '#5194EA' : 'transparent',
                                        borderColor: isSelected ? '#5194EA' : '#D1D5DB',
                                      }}
                                      className="w-4 h-4 rounded-full border items-center justify-center"
                                    >
                                      {isSelected && (
                                        <Check size={10} color="#FFFFFF" strokeWidth={3} />
                                      )}
                                    </View>
                                  </Pressable>
                                );
                              })}
                            </ScrollView>
                          </View>
                        )}
                      </View>
                    );
                  })()}
                </View>

                {/* Nomor Kamar */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Nomor Kamar <Text className="text-red-500">*</Text>
                  </Text>
                  <TextInput
                    value={newRoomNumber}
                    onChangeText={setNewRoomNumber}
                    placeholder="Contoh: A07, B05, C01"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Tipe Kamar */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Tipe Kamar
                  </Text>
                  <View className="flex-row bg-gray-50 border border-gray-200 rounded-xl p-1.5 justify-around gap-1.5">
                    {['Standar', 'Deluxe', 'VIP'].map((tp) => (
                      <Pressable
                        key={tp}
                        onPress={() => setNewType(tp)}
                        style={{
                          backgroundColor: newType === tp ? '#5194EA' : 'transparent',
                        }}
                        className="py-2 rounded-lg flex-1 items-center"
                      >
                        <Text
                          style={{
                            color: newType === tp ? '#FFFFFF' : '#4B5563',
                            fontWeight: newType === tp ? '700' : '500',
                          }}
                          className="text-xs"
                        >
                          {tp}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Harga Sewa per Bulan */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1">
                    Harga Sewa per Bulan (Rp)
                  </Text>
                  <TextInput
                    value={newPrice}
                    onChangeText={setNewPrice}
                    keyboardType="numeric"
                    placeholder="1500000"
                    placeholderTextColor="#9CA3AF"
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 font-semibold"
                  />
                </View>

                {/* Status Awal Kamar (Solid Colors) */}
                <View className="mb-3.5">
                  <Text className="text-xs font-bold text-gray-700 mb-1.5">
                    Status Awal Kamar
                  </Text>
                  <View className="flex-row gap-2.5">
                    {/* Kosong */}
                    <Pressable
                      onPress={() => setNewStatus('kosong')}
                      style={{
                        backgroundColor: newStatus === 'kosong' ? '#FEF2F2' : '#F9FAFB',
                        borderColor: newStatus === 'kosong' ? '#EF4444' : '#E5E7EB',
                      }}
                      className="flex-1 p-3 rounded-xl border flex-row items-center gap-2"
                    >
                      <View
                        style={{ backgroundColor: '#EF4444' }}
                        className="w-4 h-4 rounded-full items-center justify-center"
                      >
                        {newStatus === 'kosong' && (
                          <View className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </View>
                      <View>
                        <Text className="text-xs font-bold text-[#DC2626]">
                          Kosong
                        </Text>
                        <Text className="text-[10px] text-gray-500">Siap huni</Text>
                      </View>
                    </Pressable>

                    {/* Terisi */}
                    <Pressable
                      onPress={() => setNewStatus('terisi')}
                      style={{
                        backgroundColor: newStatus === 'terisi' ? '#EFF6FF' : '#F9FAFB',
                        borderColor: newStatus === 'terisi' ? '#5194EA' : '#E5E7EB',
                      }}
                      className="flex-1 p-3 rounded-xl border flex-row items-center gap-2"
                    >
                      <View
                        style={{ backgroundColor: '#5194EA' }}
                        className="w-4 h-4 rounded-full items-center justify-center"
                      >
                        {newStatus === 'terisi' && (
                          <View className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </View>
                      <View>
                        <Text className="text-xs font-bold text-[#1D4ED8]">
                          Terisi
                        </Text>
                        <Text className="text-[10px] text-gray-500">Ada penghuni</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>

                {/* If Terisi, input Tenant Details */}
                {newStatus === 'terisi' && (
                  <View className="p-3 bg-gray-50 rounded-xl border border-gray-200 mb-3.5 gap-2.5">
                    <View>
                      <Text className="text-[11px] font-bold text-gray-700 mb-1">
                        Nama Penghuni
                      </Text>
                      <TextInput
                        value={newTenantName}
                        onChangeText={setNewTenantName}
                        placeholder="Nama lengkap penghuni"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                      />
                    </View>

                    <View>
                      <Text className="text-[11px] font-bold text-gray-700 mb-1">
                        Nomor HP / WhatsApp
                      </Text>
                      <TextInput
                        value={newTenantPhone}
                        onChangeText={setNewTenantPhone}
                        keyboardType="phone-pad"
                        placeholder="0812xxxx"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900"
                      />
                    </View>
                  </View>
                )}

                {/* Fasilitas Checklist */}
                <View className="mb-5">
                  <Text className="text-xs font-bold text-gray-700 mb-2">
                    Fasilitas Kamar
                  </Text>
                  <View className="flex-row flex-wrap gap-1.5">
                    {availableFacilities.map((fac) => {
                      const isSelected = newFacilities.includes(fac);
                      return (
                        <Pressable
                          key={fac}
                          onPress={() => handleToggleFacility(fac)}
                          style={{
                            backgroundColor: isSelected ? '#5194EA' : '#F3F4F6',
                            borderColor: isSelected ? '#5194EA' : '#E5E7EB',
                          }}
                          className="px-3 py-1.5 rounded-lg border flex-row items-center gap-1.5"
                        >
                          {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                          <Text
                            style={{
                              color: isSelected ? '#FFFFFF' : '#374151',
                              fontWeight: isSelected ? '700' : '500',
                            }}
                            className="text-xs"
                          >
                            {fac}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={handleSaveNewRoom}
                  style={{ backgroundColor: '#5194EA' }}
                  className="w-full h-12 rounded-2xl items-center justify-center active:bg-[#3B82F6]"
                >
                  <Text className="text-base font-bold text-white">
                    Simpan Kamar Baru
                  </Text>
                </Pressable>
              </ScrollView>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 6. Modal Ubah Status & Data Penghuni (Bottom Sheet Slide Up) */}
      <Modal
        visible={isEditStatusModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseEditStatusModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-black/50 justify-end">
            <Pressable
              className="flex-1"
              onPress={handleCloseEditStatusModal}
            />

            <Animated.View
              style={{
                transform: [{ translateY: editStatusModalSlideAnim }],
              }}
              className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85%]"
            >
              {/* Modal Header */}
              <View className="flex-row items-center justify-between pb-3 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View style={{ backgroundColor: '#5194EA' }} className="w-8 h-8 rounded-xl items-center justify-center">
                    <Edit3 size={16} color="#FFFFFF" strokeWidth={2.5} />
                  </View>
                  <Text className="text-lg font-extrabold text-gray-900">
                    Ubah Status & Data Penghuni
                  </Text>
                </View>
                <Pressable
                  onPress={handleCloseEditStatusModal}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <X size={16} color="#6B7280" />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingVertical: 14 }}
              >
                {/* Room Info Tag */}
                {editingRoom && (
                  <View className="bg-gray-50 p-3 rounded-xl border border-gray-200 mb-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <DoorClosed size={16} color="#5194EA" />
                      <Text className="text-sm font-extrabold text-gray-900">
                        Kamar {editingRoom.roomNumber} ({editingRoom.type})
                      </Text>
                    </View>
                    <Text className="text-xs font-bold text-gray-600">
                      {formatRupiah(editingRoom.price)}/bln
                    </Text>
                  </View>
                )}

                {/* Status Selection */}
                <Text className="text-xs font-bold text-gray-700 mb-2">
                  Status Kamar Saat Ini
                </Text>
                <View className="flex-row gap-2 mb-4">
                  <Pressable
                    onPress={() => setEditStatus('kosong')}
                    style={{
                      backgroundColor: editStatus === 'kosong' ? '#EF4444' : '#FFFFFF',
                      borderColor: editStatus === 'kosong' ? '#EF4444' : '#E5E7EB',
                    }}
                    className="flex-1 py-3 rounded-xl border items-center justify-center flex-row gap-2 active:scale-98 shadow-xs"
                  >
                    <DoorOpen
                      size={18}
                      color={editStatus === 'kosong' ? '#FFFFFF' : '#EF4444'}
                      strokeWidth={2.5}
                    />
                    <Text
                      style={{
                        color: editStatus === 'kosong' ? '#FFFFFF' : '#374151',
                        fontWeight: editStatus === 'kosong' ? '800' : '600',
                      }}
                      className="text-xs"
                    >
                      KOSONG (Tersedia)
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setEditStatus('terisi')}
                    style={{
                      backgroundColor: editStatus === 'terisi' ? '#5194EA' : '#FFFFFF',
                      borderColor: editStatus === 'terisi' ? '#5194EA' : '#E5E7EB',
                    }}
                    className="flex-1 py-3 rounded-xl border items-center justify-center flex-row gap-2 active:scale-98 shadow-xs"
                  >
                    <DoorClosed
                      size={18}
                      color={editStatus === 'terisi' ? '#FFFFFF' : '#5194EA'}
                      strokeWidth={2.5}
                    />
                    <Text
                      style={{
                        color: editStatus === 'terisi' ? '#FFFFFF' : '#374151',
                        fontWeight: editStatus === 'terisi' ? '800' : '600',
                      }}
                      className="text-xs"
                    >
                      TERISI (Berpenghuni)
                    </Text>
                  </Pressable>
                </View>

                {/* Tenant Details (only if status is terisi) */}
                {editStatus === 'terisi' && (
                  <View className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200 mb-4 gap-3">
                    <Text className="text-xs font-bold text-gray-900">
                      Informasi Penghuni Kamar
                    </Text>

                    <View>
                      <Text className="text-[11px] font-bold text-gray-700 mb-1">
                        Nama Lengkap Penghuni <Text className="text-red-500">*</Text>
                      </Text>
                      <TextInput
                        value={editTenantName}
                        onChangeText={setEditTenantName}
                        placeholder="Contoh: Andi Pratama"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900"
                      />
                    </View>

                    <View>
                      <Text className="text-[11px] font-bold text-gray-700 mb-1">
                        Nomor HP / WhatsApp
                      </Text>
                      <TextInput
                        value={editTenantPhone}
                        onChangeText={setEditTenantPhone}
                        keyboardType="phone-pad"
                        placeholder="Contoh: 081234567890"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900"
                      />
                    </View>

                    <View>
                      <Text className="text-[11px] font-bold text-gray-700 mb-1">
                        Tanggal Jatuh Tempo Pembayaran
                      </Text>
                      <TextInput
                        value={editDueDate}
                        onChangeText={setEditDueDate}
                        placeholder="Contoh: 26 Okt 2026"
                        placeholderTextColor="#9CA3AF"
                        className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900"
                      />
                    </View>
                  </View>
                )}

                {/* Action Submit */}
                <Pressable
                  onPress={handleSaveEditStatus}
                  style={{ backgroundColor: '#5194EA' }}
                  className="w-full h-12 rounded-2xl items-center justify-center active:bg-[#3B82F6] mt-2 shadow-xs"
                >
                  <Text className="text-base font-bold text-white">
                    Simpan Perubahan
                  </Text>
                </Pressable>
              </ScrollView>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* 7. Custom Alert Modal (No Native Alerts) */}
      <CustomAlertModal
        visible={alertModal.visible}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        confirmText={alertModal.confirmText}
        cancelText={alertModal.cancelText}
        onConfirm={() => {
          if (alertModal.onConfirm) {
            alertModal.onConfirm();
          }
          setAlertModal({ ...alertModal, visible: false });
        }}
        onClose={() => setAlertModal({ ...alertModal, visible: false })}
      />
    </View>
  );
}
