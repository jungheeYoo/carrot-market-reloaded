// --------------------------------------------------------
// Products
// 10-1
// Tab Bar

import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}

// navigation bar를 layout에 두었기 때문에
// 이 모든 route는 같은 navigation bar를 공유하고 있다
// layout을 한 그룹에 두면 이 layout은 다른 그룹의 영향을 받지 않게 된다
// 즉 이 layout은 오직 여기 page에만 영향을 준다
