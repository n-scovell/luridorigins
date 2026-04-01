import { supabase } from './supabaseclient'

export const States = () => ({
  searchVal: '',
  theme: 'light',
  chsSeg: 'C',
  luridOrigins: [],
  luridOriginsLimit: [],
  searchedLO: [],
  luridOriginsLastFetched: null,
  mypage: 1,
  limit: 50,
  maxpages:0,
  isLoading:false,
  modalOpen:false,
  selectedMovie:'Evil Dead 1981',
})

export const LocalStore = ['theme']

export const Actions = (set, get) => ({
  setCoolness: (prop) => set({ coolness: prop }),
  toggleTheme: () =>
    set((state) => ({theme: state.theme === 'light' ? 'dark' : 'light',
  })),
  changeSegment: (prop) => set({ chsSeg: prop }),

  setPage: (prop) =>  {
    const {mypage} = get()
    set({ mypage: mypage + (prop ? 1 : -1) })
  },
  setMovie: (name, year) => {
    set({selectedMovie: `${name} ${year}`, modalOpen: true})
  },
  closeModal: () => {
    set({modalOpen: false})
  },
  setSearchVal: (a) => {
    const {searchVal} = get()
    set({ searchVal: a })
  },

  getLuridOrigins: async (page = 1, force = true) => {
  const { luridOriginsLastFetched, limit } = get()
  const dayPassed = 1000 * 60 * 60 * 24
  set({isLoading: false})
  if (
    !force &&
    luridOriginsLastFetched &&
    Date.now() - luridOriginsLastFetched < dayPassed
  ) {
    return
  }
  const from = (page - 1) * limit
  const to = from + limit - 1
  try {
    const { data, count, error } = await supabase
      .from('_luridOrigins')
      .select('*', { count: 'exact' })
      .ilike('Status', '%yes%')
      .order('Year', { ascending: true })
      .range(from, to)
    if (error) throw error
    const totalPages = Math.ceil(count / limit)
    set({
      isLoading: true,
      luridOriginsLimit: data,
      luridOriginsPage: page,        // ✅ keep page in state
      maxpages: totalPages,         // ✅ store max pages
      luridOriginsLastFetched: Date.now()
    })

  } catch (err) {
    console.error('Lurid Origins failed:', err)
    set({ error: err.message })
  }
},

getAllLuridOrigins: async (force = false) => {
  const { luridOriginsAll, luridOriginsAllLastFetched } = get()
  const dayPassed = 1000 * 60 * 60 * 24
  if (
    !force &&
    luridOriginsAll.length &&
    luridOriginsAllLastFetched &&
    Date.now() - luridOriginsAllLastFetched < dayPassed
  ) {
    return
  }

  try {
    const { data, error } = await supabase
      .from('_luridOrigins')
      .select('*')
      .ilike('Status', '%yes%')
      .order('Year', { ascending: true })

    if (error) throw error

    set({
      luridOrigins: data,
      luridOriginsAllLastFetched: Date.now()
    })

  } catch (err) {
    console.error(err)
  }
},
filterSearch: (a) => {
  const {luridOrigins} = get()
  const search = a.toLowerCase()
  const exclude = ['Id', 'Status', 'Comment', 'FansOf']
  const results = luridOrigins.filter((lo) =>
    Object.entries(lo)
      .filter(([key]) => !exclude.includes(key))
      .some(([key, val]) => String(val).toLowerCase().includes(search))
  )
  set({ luridOriginsLimit: results })
}

})