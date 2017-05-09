<?php
use PHPUnit\Framework\TestCase;

class StackTest extends TestCase
{
	// Examples mostly taken from http://html5pattern.com/

	/**
	 * Letters, numbers
	 */
    public function testAlphanum()
    {

		$validator = new \ioValidate\Validator\regex(
			array(
				'pattern' => '[a-z0-9]*'
			)
		);
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;
		// Fine
		$this->assertTrue( $validator->Validate( 'abc123', $values ) );

		// Has invalid character
		$this->assertFalse( $validator->Validate( 'abc123!', $values ) );
    }
	/**
	 * Letters, numbers, underscores and hypehns
	 */
	public function testAlphanumUnderscoreHyphen()
    {

		$validator = new \ioValidate\Validator\regex(
			array(
				'pattern' => '[a-z0-9_-]*'
			)
		);
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Fine
		$this->assertTrue( $validator->Validate( 'abc_def-123', $values ) );

		// Has invalid character
		$this->assertFalse( $validator->Validate( 'abc_def-123!', $values ) );
    }
	/**
	 * Letters, numbers and must have a value
	 */
	public function testAlphanumRequired()
    {

		$validator = new \ioValidate\Validator\regex(
			array(
				'pattern' => '[a-zA-Z0-9]+'
			)
		);
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Fine
		$this->assertTrue( $validator->Validate( 'a', $values ) );

		// No value
		$this->assertFalse( $validator->Validate( '', $values ) );

		// Has invalid character
		$this->assertFalse( $validator->Validate( 'a!', $values ) );
    }
	/**
	 * Letters, numbers and must be between 2 and 20 characters
	 */
	public function testAlphanumMinMaxLength()
	{

		$validator = new \ioValidate\Validator\regex(
			array(
				'pattern' => '^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$'
			)
		);
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Too short
		$this->assertFalse( $validator->Validate( 'a', $values ) );

		// Just right
		$this->assertTrue( $validator->Validate( 'ab', $values ) );

		// Too long
		$this->assertFalse( $validator->Validate( 'abcdefghijklmnopqrstuvwxyz', $values ) );
	}
}
?>
