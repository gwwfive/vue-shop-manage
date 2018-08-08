import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('v1/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('v1/admin/logout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('v1/admin/info');

/**
 * 获取主页轮播图
 */

export const getCarousel = () => fetch('v1/carousel/');

/**
 * 更改主页轮播图
 */

export const updateCarousel = data => fetch('v1/carousel/', data, 'PUT');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('v1/user/', date);

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/v1/order/', date);


/**
 * 某一天销售量
 */

export const saleCount = date => fetch('/v1/sale/', date);

/***
 * 某一天的计算量
 */

export const countDay = date => fetch('v1/count/', date);

/***
 * 所有的计算量
 */
export const count = data => fetch('v1/count/',data);
/**
 * 商店管理
 */

export const getShop = () => fetch('v1/shop/');

export const updateShop = data => fetch('v1/shop/', data, 'PUT');



/**
 * 添加商铺
 */

// export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = data => fetch('v1/category/', data);

/**
 * 添加食品种类
 */

export const addCategory = data => fetch('v1/category/', data, 'POST');

/**
 * 更改商品种类状态
 *
 */
export const changeCategoryStatus = data => fetch('v1/category/', data, 'PUT');

/***
 * 删除种类
 */
export const deleteCategory = data => fetch('v1/category/', data, 'DELETE');

/**
 * 添加食品
 */

export const addProduct = data => fetch('v1/product/', data, 'POST');


/**
 * 修改食品
 */

export const editProduct = data => fetch('v1/product/', data, 'PUT');

/**
 * 获取食品列表
 */

export const getProduct = data => fetch('v1/product/', data);

/**
 * 获取订单列表
 */

export const getOrders = data => fetch('/v1/order/', data);

/**
 * 获取订单数量
 * */
export const getOrderCount = data => fetch('/v1/order/', data);


/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 保存或新建活动
 */
export const saveCollage = data => fetch('/v1/collage/', data, 'PUT');

/**
 * 获取活动或活动列表
 */
export const getCollage = data => fetch('/v1/collage/', data);

/**
 * 更改活动的状态
 */
export const collageChangeStatus = data => fetch('/v1/collage/', data, 'PUT');

/**
 * 删除活动
 */
export const deleteCollage = data => fetch('/v1/collage/', data, 'DELETE');
/**
 * 搜索商品Id
 */
export const searchId = data => fetch('/v1/id/search/', data);

/**
 * 获取商品的sku
 */
export const getProductSku = data => fetch('/v1/sku/', data);

/**
 * 添加或保存拼团商品
 */
export const addCollageProduct = data => fetch('/v1/collage/product/', data, 'PUT');

/**
 * 返回建议的地址
 */
export const suggestAddress = data => fetch('/v1/address/suggest/', data);


/**
 * 获取代理或申请数目
 * */

export const getApplyCount = data => fetch('/v1/agent/', data);
/**
 * 获取代理或申请
 * */
export const getAgentApply = data => fetch('v1/agent/', data);

/***
 * 审核代理
 */

export const verifyApply = data => fetch('v1/agent/', data, 'PUT');

/***
 * 改变代理状态
 */

export const agentStatus = data => fetch('v1/agent/', data, 'put');

/***
 * 订单添加快递信息
 */

export const confirmExpress = data => fetch('v1/order/', data, 'PUT');

/***
 * 添加优惠券
 */
export const addCoupon = data => fetch('v1/coupon/', data, 'POST');

/***
 * 加载优惠券
 */
export const getCoupon = data => fetch('v1/coupon/', data);

/**
 * 更改优惠券的状态
 * */

export const couponChangeStatus = data => fetch('v1/coupon/', data, 'PUT');

/***
 * 加载会员信息
 */
export const getMember = data => fetch('v1/member/', data);

/***
 * 添加会员等级
 *
 */
export const addMember = data => fetch('v1/member/', data, 'POST');

/***
 * 会员等级数
 */
export const getMemberCount = data => fetch('v1/member/', data);

/***
 * 改变商品SKU状态
 */
export const changeSkuStatus = data => fetch('v1/product/', data, 'PUT');

/***
 * 改变商品的状态
 */
export const changeProductStatus = data => fetch('v1/product/', data, 'PUT');

/***
 * 加载分销设置
 */
export const getDistribution = data => fetch('v1/distribution/',data);

/***
 * 提交修改
 */

export const setDistribution = data => fetch('v1/distribution/',data,'PUT');

