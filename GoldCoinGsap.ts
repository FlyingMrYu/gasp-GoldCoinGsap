import { TimelineLite } from 'gsap';
/**
 * parentElement: 父元素
 * elementRef: img
 * endElementX: 终点 left
 * endElementY: 终点 top
 * startElementX: 起点 left
 * startElementY: 起点 top
 */
// 动画

interface HTMLElementDiv {
	parentElement: string;
	elementRef?: string;
	endElementX: number;
	endElementY: number;
	startElementX: number;
	startElementY: number;
}

class GoldCoinGsap {
	private parentElement: string;
	private elementRef: string;
	private endElementX: number;
	private endElementY: number;
	private startElementX: number;
	private startElementY: number;
	private caller;
	private method: Function;
	public constructor(options: HTMLElementDiv, caller, method: Function) {
		this.parentElement = options.parentElement;
		this.elementRef = options.elementRef || 'img';
		this.startElementX = options.startElementX;
		this.startElementY = options.startElementY;
		this.endElementX = options.endElementX;
		this.endElementY = options.endElementY;
		this.method = method;
		this.caller = caller;
	}
	// 初始化
	public async init() {
		const parentElements = document.getElementById(this.parentElement) as HTMLElement;
		// 创建img标签并添加属性
		for (let i = 0; i < 4; i++) {
			const imgs = document.createElement('img');
			imgs.setAttribute('class', `one-bean${i}`);
			if (i === 0) {
				imgs.style.left = `${this.startElementX}px`;
				imgs.style.top = `${this.startElementY}px`;
			} else if (i === 1) {
				imgs.style.left = `${this.startElementX}px`;
				imgs.style.top = `${this.startElementY + 40}px`;
			} else if (i === 2) {
				imgs.style.left = `${this.startElementX + 40}px`;
				imgs.style.top = `${this.startElementY}px`;
			} else if (i === 3) {
				imgs.style.left = `${this.startElementX + 40}px`;
				imgs.style.top = `${this.startElementY + 40}px`;
			}
			imgs.style.zIndex = `${this.startElementY}px`;
			imgs.style.zIndex = '999';
			imgs.style.transform = 'scale(0)';
			imgs.style.opacity = '0';
			imgs.style.position = 'absolute';
			imgs.style.width = '36px';
			imgs.style.height = '36px';
			imgs.setAttribute('ref', this.elementRef);
			imgs.src = require('../../assets/images/beans.png');
			parentElements.appendChild(imgs);
		}
		await this.gsapInit();
	}
	// 动画执行
	private async gsapInit() {
		const element1 = new TimelineLite();
		const element2 = new TimelineLite();
		const element3 = new TimelineLite();
		const el = ['.one-bean0', '.one-bean1'];
		element1
			.to(el, 0.6, { opacity: 1 })
			.to(el, 0.6, { scale: 1 }, '-=0.15')
			.to(el, 0.8, { left: this.endElementX, top: this.endElementY, ease: 'Power2.easeIn' })
			.to(el, 0.15, { scale: 0 }, '+=0.01');
		element2
			.to('.one-bean2', 0.6, { opacity: 1, delay: 0.7 })
			.to('.one-bean2', 0.6, { scale: 1 }, '-=0.15')
			.to('.one-bean2', 0.8, { left: this.endElementX, top: this.endElementY, ease: 'Power2.easeIn' })
			.to('.one-bean2', 0.15, { scale: 0 }, '+=0.01');
		element3
			.to('.one-bean3', 0.6, { opacity: 1, delay: 1 })
			.to('.one-bean3', 0.6, { scale: 1 }, '-=0.15')
			.to('.one-bean3', 0.8, { left: this.endElementX, top: this.endElementY, ease: 'Power2.easeIn' })
			.to('.one-bean3', 0.15, { scale: 0, onComplete: this.onComplete.bind(this) }, '+=0.01');
	}
	private onComplete() {
		this.method.call(this.caller);
	}
}

// test调用方法
// const elements = {
//     parentElement: 'storage-package',
//     startElementX: 140,
//     startElementY: 150,
//     endElementX: 40,
//     endElementY: 550
// };
// const goldCoinGsap = new GoldCoinGsap(elements, this, this.inllf);
// goldCoinGsap.init();

export default GoldCoinGsap;
