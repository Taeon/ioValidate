<?php

namespace ioValidate\Validator;

class filetype extends \ioValidate\Validator{
	protected $valid_types;
	protected $valid_types_groups = array(
		// Image files
		'image' => array (
			array(
				'name' => 'GIF',
				'mimetypes' => array(
					'image/gif'
				),
				'extensions' => array(
					'gif'
				)
			),
			array(
				'name' => 'JPEG',
				'mimetypes' => array(
					'image/jpeg',
					'image/pjpeg',
				),
				'extensions' => array(
					'jpg',
					'jpeg'
				)
			),
			array(
				'name' => 'PNG',
				'mimetypes' => array(
					'image/png'
				),
				'extensions' => array(
					'png'
				)
			)
		)
	);

	public function __construct( $definition ){
		parent::__construct( $definition );
		if( isset( $definition->valid_types_group ) ){
			if( isset( $this->valid_types_groups[ $definition->valid_types_group ] ) ){
				$this->valid_types = $this->valid_types_groups[ $definition->valid_types_group ];
			} else {
				throw new \Exception( 'Invalid file type group [' . $definition->valid_types_group . ']' );
			}
		}
	}

	public function GetFormAttributes(){
		if( count( $this->valid_types ) == 0 ){
			throw new \Exception( 'You must specify at least one valid file type' );
		}

		$values = (object)array(
			'types' => $this->valid_types
		);

		return array_merge( array( 'data-iovalidate-filetype' => json_encode( $values ) ), parent::GetFormAttributes() );
	}

}
