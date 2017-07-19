<?php
use PHPUnit\Framework\TestCase;

class ValidatorRegex extends TestCase
{
	// Examples mostly taken from http://html5pattern.com/

	/**
	 * Letters, numbers
	 */
    public function testAlphanum()
    {

		$validator = new \ioValidate\Validator\regex(
			array(
				'pattern' => '[^a-z0-9]+'
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
				'pattern' => '[^a-z0-9_-]+'
			)
		);
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values;

		// Fine
		$this->assertTrue( $validator->Validate( 'abc_def-123', $values ) );

		// Has invalid character
		$this->assertFalse( $validator->Validate( 'abc_def-123!', $values ) );
    }
}
?>
