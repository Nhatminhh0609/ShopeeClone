import { useQuery } from '@tanstack/react-query'
import { purchasesStatus } from '../../constants/purchase'
import purchaseApi from '../../apis/purchase.api'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'
import { useEffect, useState } from 'react'
import type { Purchase } from '../../types/purchase.type'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  useEffect(() => {
    setExtendedPurchases(purchasesInCart?.map((purchase) => ({
      ...purchase,
      disabled:false,
      checked: false
    })) || []
  )
  }, [purchasesInCart])

  // const handleChecke = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    
  // }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='over-flow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange-500' />
                  </div>
                  <div className='flex-grow text-black text-left'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid text-center grid-cols-5'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendPurchases?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500 mb-5  first:mt-0'
                >
                  <div className='col-span-6'>
                    <div className='flex '>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input type='checkbox' className='h-5 w-5 accent-orange-500' checked={purchase.checked} onChange={}/>
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='h-20 w-20 flex-shrink-0 '
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='line-clamp-2 '
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange-500'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange-500'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow '>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input type='checkbox' className='h-5 w-5 accent-orange-500' />
                </div>
                <button className='mx-3 border-none bg-none'>Chọn tất cả</button>
                <button className='mx-3 border-none bg-none'>Xóa</button>
                <div className='ml-auto flex items-center '>
                  <div>
                    <div className='flex items-center justify-end'>
                      <div>Tổng thanh toán (0 sản phẩm):</div>
                      <div className='ml-2 text-2xl text-orange-500'>₫200000</div>
                    </div>
                    <div className='flex items-center justify-end text-sm '>
                      <div className='text-gray-500'>Tiết kiệm</div>
                      <div className='ml-6 text-orange-500'>₫200000</div>
                    </div>
                  </div>
                  <Button className='ml-4 h-10 w-52  uppercase bg-red-500 text-white  hover:bg-red-600 flex justify-center items-center'>
                    Mua hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
