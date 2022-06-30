interface CreateTab {
  type: string; // tab类型
  pid: string; // 父tab id
  id?: string; // tab id
  name: string; // tab菜单名称
  data?: any; // tab携带数据
  closeable?: boolean; // 是否可关闭
}