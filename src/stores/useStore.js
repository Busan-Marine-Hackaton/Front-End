import { create } from "zustand";
import { persist } from "zustand/middleware"; // zustand의 persist 미들웨어

const useStore = create(
  persist(
    (set) => ({
      name: "",
      realId: "",
      enterpriseId: null,
      setName: (name) => set({ name }),
      setRealId: (realId) => set({ realId }),
      setEnterpriseId: (enterpriseId) => set({ enterpriseId }),
      reset: () => set({ name: "", realId: "", enterpriseId: null }), // 로그아웃 시 초기화
    }),
    {
      name: "user-storage", // 로컬 스토리지에 저장할 키 이름
    }
  )
);

export default useStore;
