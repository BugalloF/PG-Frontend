import React from "react";
import iconNot from './notFoundiconV5.png'
import s from "./NotFound.module.css";

export default function NotFound() {

	return (
		<div className={s.container_notFound} >
			<img className={s.imgg} src={iconNot} alt="image not found" />
			<h2>Imagen no encontrada</h2>
		</div>
	);
}